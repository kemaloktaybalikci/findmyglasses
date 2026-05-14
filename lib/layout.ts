import type { ScoredProduct } from "./scoring";

export type Position = { x: number; y: number; scale: number; opacity: number };

type Ring = {
  capacity: number;
  rx: number;
  ry: number;
  scale: number;
  opacity: number;
};

const RINGS: Ring[] = [
  { capacity: 1, rx: 0, ry: 0, scale: 1.6, opacity: 1 },
  { capacity: 5, rx: 240, ry: 165, scale: 1.0, opacity: 1 },
  { capacity: 7, rx: 420, ry: 295, scale: 0.78, opacity: 0.85 },
  { capacity: 99, rx: 580, ry: 405, scale: 0.62, opacity: 0.55 },
];

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
): Map<string, Position> {
  const positions = new Map<string, Position>();

  if (stage === "intro" || !hasAnswers) {
    const total = scored.length;
    scored.forEach((p, i) => {
      const angle = (i / total) * Math.PI * 2 + (hash(p.id) - 0.5) * 0.5;
      const rxBase = stage === "intro" ? 320 : 360;
      const rx = rxBase + (hash(p.id + "r") - 0.5) * 160;
      const ry = rx * 0.6;
      positions.set(p.id, {
        x: Math.cos(angle) * rx,
        y: Math.sin(angle) * ry,
        scale: 0.85 + hash(p.id + "s") * 0.18,
        opacity: 0.65 + hash(p.id + "o") * 0.3,
      });
    });
    return positions;
  }

  const sorted = [...scored].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.id.localeCompare(b.id);
  });

  let index = 0;
  for (const ring of RINGS) {
    const items = sorted.slice(index, index + ring.capacity);
    if (items.length === 0) break;

    if (ring.rx === 0) {
      positions.set(items[0].id, {
        x: 0,
        y: 0,
        scale: ring.scale,
        opacity: ring.opacity,
      });
    } else {
      const startAngle = -Math.PI / 2 + (hash(`ring${index}`) - 0.5) * 0.4;
      items.forEach((p, i) => {
        const baseAngle = (i / items.length) * Math.PI * 2 + startAngle;
        const jitterA = (hash(p.id + "a") - 0.5) * 0.18;
        const jitterRx = (hash(p.id + "rx") - 0.5) * 30;
        const jitterRy = (hash(p.id + "ry") - 0.5) * 22;
        positions.set(p.id, {
          x: Math.cos(baseAngle + jitterA) * (ring.rx + jitterRx),
          y: Math.sin(baseAngle + jitterA) * (ring.ry + jitterRy),
          scale: ring.scale + (hash(p.id + "s") - 0.5) * 0.05,
          opacity: ring.opacity,
        });
      });
    }

    index += ring.capacity;
  }

  return positions;
}
