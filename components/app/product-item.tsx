"use client";

import { motion } from "motion/react";
import { GlassesSvg } from "./glasses-svg";
import type { ScoredProduct } from "@/lib/scoring";
import type { Stage } from "@/lib/layout";

type Props = {
  product: ScoredProduct;
  stage: Stage;
  isTop: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
};

export function ProductItem({
  product,
  stage,
  isTop,
  isSelected,
  onSelect,
}: Props) {
  const showScore = stage === "result";

  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      className="pointer-events-auto flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center bg-transparent p-0 text-left"
    >
      <div
        className={`w-20 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-0.5 hover:scale-[1.08] sm:w-28 md:w-32 ${
          isSelected ? "drop-shadow-[0_0_0_2px_rgba(0,0,0,1)]" : ""
        }`}
      >
        <GlassesSvg
          shape={product.shape}
          frameColor={product.frameColor}
          lensColor={product.lensColor}
          className="h-auto w-full"
        />
      </div>
      <div className="mt-2 flex flex-col items-center">
        <div
          className={`text-[10px] font-medium uppercase tracking-[0.16em] ${
            isSelected ? "text-zinc-900" : "text-zinc-800"
          }`}
        >
          {product.name}
        </div>
        {showScore && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isTop ? 0.6 : 0.9, duration: 0.4 }}
            className={
              isTop
                ? "mt-0.5 text-xs font-semibold tabular-nums text-zinc-900"
                : "mt-0.5 text-[10px] tabular-nums text-zinc-500"
            }
          >
            {product.score}%
          </motion.div>
        )}
      </div>
    </button>
  );
}
