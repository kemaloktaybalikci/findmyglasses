import type { Product, Style, Usage, Shape, Palette } from "./products";

export type Answers = {
  style?: Style;
  usage?: Usage;
  shape?: Shape;
  palette?: Palette;
};

const styleAdjacency: Record<Style, Style[]> = {
  minimal: ["retro"],
  retro: ["minimal", "bold"],
  bold: ["retro"],
  sporty: [],
};

const shapeAdjacency: Record<Shape, Shape[]> = {
  round: ["catEye"],
  catEye: ["round"],
  square: ["wayfarer"],
  wayfarer: ["square", "aviator"],
  aviator: ["wayfarer"],
};

const paletteAdjacency: Record<Palette, Palette[]> = {
  warm: [],
  cool: ["mono"],
  mono: ["cool"],
  colorful: [],
};

export function scoreProduct(product: Product, answers: Answers): number {
  let total = 0;
  let weight = 0;

  if (answers.style) {
    weight += 1;
    if (product.style === answers.style) total += 1;
    else if (styleAdjacency[product.style].includes(answers.style)) total += 0.5;
  }
  if (answers.usage) {
    weight += 1;
    if (product.usage.includes(answers.usage)) total += 1;
    else total += 0.2;
  }
  if (answers.shape) {
    weight += 1;
    if (product.shape === answers.shape) total += 1;
    else if (shapeAdjacency[product.shape].includes(answers.shape)) total += 0.55;
  }
  if (answers.palette) {
    weight += 1;
    if (product.palette === answers.palette) total += 1;
    else if (paletteAdjacency[product.palette].includes(answers.palette)) total += 0.5;
  }

  if (weight === 0) return 50;
  return Math.round((total / weight) * 100);
}

export type ScoredProduct = Product & { score: number };

export function scoreAll(items: Product[], answers: Answers): ScoredProduct[] {
  return items.map((p) => ({ ...p, score: scoreProduct(p, answers) }));
}
