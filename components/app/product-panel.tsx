"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { GlassesSvg } from "./glasses-svg";
import type { ScoredProduct } from "@/lib/scoring";
import type { Stage } from "@/lib/layout";

type Props = {
  product: ScoredProduct | null;
  stage: Stage;
  hasAnswers: boolean;
  onClose: () => void;
};

const styleLabels: Record<string, string> = {
  minimal: "Minimal",
  retro: "Retro",
  bold: "Bold",
  sporty: "Sporty",
};
const usageLabels: Record<string, string> = {
  city: "City",
  beach: "Beach",
  driving: "Driving",
  mountain: "Mountain",
};
const paletteLabels: Record<string, string> = {
  mono: "Mono",
  warm: "Warm",
  cool: "Cool",
  colorful: "Colorful",
};
const shapeLabels: Record<string, string> = {
  round: "Round",
  square: "Square",
  aviator: "Aviator",
  catEye: "Cat-eye",
  wayfarer: "Wayfarer",
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-700">
      {children}
    </span>
  );
}

export function ProductPanel({ product, stage, hasAnswers, onClose }: Props) {
  const showScore = stage !== "intro" && hasAnswers;
  return (
    <AnimatePresence>
      {product && (
        <motion.aside
          key={product.id}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 240 }}
          className="pointer-events-auto fixed inset-y-0 right-0 z-30 flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)] sm:w-[400px]"
        >
          <header className="flex items-start justify-between gap-4 px-7 pt-7">
            <div className="text-[11px] uppercase tracking-[0.28em] text-zinc-400">
              {showScore ? "Match" : "Pair"}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="-mr-1 -mt-1 grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </header>

          <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-7 pb-8 pt-2">
            <div className="flex justify-center pt-4">
              <div className="w-56">
                <GlassesSvg
                  shape={product.shape}
                  frameColor={product.frameColor}
                  lensColor={product.lensColor}
                  className="h-auto w-full"
                />
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-zinc-900">
                {product.name}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">{product.tagline}</p>
            </div>

            {showScore && (
              <div className="flex items-baseline gap-3 border-y border-zinc-100 py-4">
                <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                  Match score
                </div>
                <div className="text-3xl font-semibold tabular-nums text-zinc-900">
                  {product.score}
                  <span className="text-lg text-zinc-400">%</span>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div className="text-[10px] uppercase tracking-[0.28em] text-zinc-400">
                Details
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Chip>{styleLabels[product.style] ?? product.style}</Chip>
                <Chip>{shapeLabels[product.shape] ?? product.shape}</Chip>
                <Chip>{paletteLabels[product.palette] ?? product.palette}</Chip>
                {product.usage.map((u) => (
                  <Chip key={u}>{usageLabels[u] ?? u}</Chip>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
