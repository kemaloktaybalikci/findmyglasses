import type { ScoredProduct } from "./scoring";

export type Position = { x: number; y: number; scale: number; opacity: number };
export type Viewport = { width: number; height: number };

type Ring = {
  capacity: number;
  rxRatio: number;
  ryRatio: number;
  scale: number;
  opacity: number;
};

const RING_CONFIGS: Omit<Ring, "capacity">[] = [
  { rxRatio: 0.4, ryRatio: 0.48, scale: 0.95, opacity: 1 },
  { rxRatio: 0.66, ryRatio: 0.74, scale: 0.72, opacity: 0.85 },
  { rxRatio: 0.86, ryRatio: 0.92, scale: 0.56, opacity: 0.65 },
  { rxRatio: 1.0, ryRatio: 1.04, scale: 0.44, opacity: 0.45 },
  { rxRatio: 1.1, ryRatio: 1.12, scale: 0.34, opacity: 0.3 },
  { rxRatio: 1.18, ryRatio: 1.18, scale: 0.27, opacity: 0.2 },
];

const RING_CAPACITIES = [6, 9, 13, 18, 24, 32];

function buildRings(productCount: number): Ring[] {
  const rings: Ring[] = [
    { capacity: 1, rxRatio: 0, ryRatio: 0, scale: 1.5, opacity: 1 },
  ];
  let remaining = productCount - 1;
  for (let i = 0; i < RING_CONFIGS.length && remaining > 0; i++) {
    const cap = RING_CAPACITIES[i] ?? 32;
    const take = i === RING_CONFIGS.length - 1 ? remaining : Math.min(remaining, cap);
    rings.push({ ...RING_CONFIGS[i], capacity: take });
    remaining -= take;
  }
  return rings;
}

function productHalfWidth(w: number): number {
  if (w < 640) return 56;
  if (w < 768) return 70;
  return 80;
}

function safeZones(viewport: Viewport): { header: number; options: number } {
  const tightWidth = viewport.width < 640;
  const headerRatio = tightWidth ? 0.24 : 0.22;
  const optionsRatio = tightWidth ? 0.44 : 0.28;
  return {
    header: Math.max(140, viewport.height * headerRatio),
    options: Math.max(180, viewport.height * optionsRatio),
  };
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

export type Stage = "intro" | "questioning" | "result";

export function computePositions(
  scored: ScoredProduct[],
  stage: Stage,
  hasAnswers: boolean,
  viewport: Viewport,
): Map<string, Position> {
  const positions = new Map<string, Position>();

  const maxRx = Math.max(
    100,
    viewport.width / 2 - productHalfWidth(viewport.width) - 16,
  );
  const { header: headerSafe, options: optionsSafe } = safeZones(viewport);
  const safeBand = viewport.height - headerSafe - optionsSafe;
  const maxRy = Math.max(80, safeBand / 2);
  const cloudYOffset =
    stage === "intro"
      ? 0
      : headerSafe + safeBand / 2 - viewport.height / 2;

  if (stage === "intro" || !hasAnswers) {
    const total = scored.length;
    const introUiHalfHeight = Math.min(180, viewport.height * 0.22);
    const introRxBase = stage === "intro" ? maxRx * 0.92 : maxRx * 0.78;
    const introRyBase =
      stage === "intro"
        ? Math.max(introUiHalfHeight + 60, viewport.height * 0.32)
        : maxRy * 0.85;
    const arcCount = Math.ceil(total / 2);
    scored.forEach((p, i) => {
      const isUpper = i % 2 === 0;
      const arcIndex = Math.floor(i / 2);
      const t = arcIndex / Math.max(1, arcCount - 1);
      const baseArcAngle = -(3 * Math.PI) / 4 + t * (Math.PI / 2);
      const angle =
        (isUpper ? baseArcAngle : -baseArcAngle) +
        (hash(p.id) - 0.5) * 0.18;
      const rxJitter = (hash(p.id + "r") - 0.5) * introRxBase * 0.18;
      const ryJitter = (hash(p.id + "ry") - 0.5) * introRyBase * 0.16;
      positions.set(p.id, {
        x: Math.cos(angle) * (introRxBase + rxJitter),
        y: Math.sin(angle) * (introRyBase + ryJitter) + cloudYOffset,
        scale: 0.78 + hash(p.id + "s") * 0.18,
        opacity: 0.6 + hash(p.id + "o") * 0.3,
      });
    });
    return positions;
  }

  const sorted = [...scored].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.id.localeCompare(b.id);
  });

  const rings = buildRings(sorted.length);
  let index = 0;
  for (const ring of rings) {
    const items = sorted.slice(index, index + ring.capacity);
    if (items.length === 0) break;

    const rx = ring.rxRatio * maxRx;
    const ry = ring.ryRatio * maxRy;

    if (rx === 0 && ry === 0) {
      positions.set(items[0].id, {
        x: 0,
        y: cloudYOffset,
        scale: ring.scale,
        opacity: ring.opacity,
      });
    } else {
      const startAngle = -Math.PI / 2 + (hash(`ring${index}`) - 0.5) * 0.4;
      items.forEach((p, i) => {
        const baseAngle = (i / items.length) * Math.PI * 2 + startAngle;
        const jitterA = (hash(p.id + "a") - 0.5) * 0.18;
        const jitterRx = (hash(p.id + "rx") - 0.5) * rx * 0.08;
        const jitterRy = (hash(p.id + "ry") - 0.5) * ry * 0.08;
        positions.set(p.id, {
          x: Math.cos(baseAngle + jitterA) * (rx + jitterRx),
          y: Math.sin(baseAngle + jitterA) * (ry + jitterRy) + cloudYOffset,
          scale: ring.scale + (hash(p.id + "s") - 0.5) * 0.05,
          opacity: ring.opacity,
        });
      });
    }

    index += ring.capacity;
  }

  return positions;
}
