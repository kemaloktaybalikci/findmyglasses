"use client";

import { motion } from "motion/react";
import { GlassesSvg } from "./glasses-svg";
import type { ScoredProduct } from "@/lib/scoring";

type Props = {
  products: ScoredProduct[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function ProductList({ products, selectedId, onSelect }: Props) {
  const sorted = [...products].sort((a, b) => b.score - a.score);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-auto mx-auto w-full max-w-2xl px-4 sm:px-6"
    >
      <ul className="flex flex-col gap-1.5">
        {sorted.map((p, i) => {
          const isSelected = p.id === selectedId;
          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={`group flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  isSelected
                    ? "border-zinc-900 bg-zinc-50"
                    : "border-zinc-200/80 bg-white hover:border-zinc-400"
                }`}
              >
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-zinc-100 text-[11px] font-semibold tabular-nums text-zinc-600">
                  {i + 1}
                </div>
                <div className="w-16 shrink-0">
                  <GlassesSvg
                    shape={p.shape}
                    frameColor={p.frameColor}
                    lensColor={p.lensColor}
                    className="h-auto w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-zinc-900">
                    {p.name}
                  </div>
                  <div className="truncate text-xs text-zinc-500">
                    {p.tagline}
                  </div>
                </div>
                <div className="text-base font-semibold tabular-nums text-zinc-900">
                  {p.score}
                  <span className="text-xs text-zinc-400">%</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
