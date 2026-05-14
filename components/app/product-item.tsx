"use client";

import { motion } from "motion/react";
import { GlassesSvg } from "./glasses-svg";
import type { ScoredProduct } from "@/lib/scoring";
import type { Stage } from "@/lib/layout";

type Props = {
  product: ScoredProduct;
  stage: Stage;
  isTop: boolean;
};

export function ProductItem({ product, stage, isTop }: Props) {
  const showScore = stage === "result";

  return (
    <div className="flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <motion.div
        className="w-32"
        whileHover={{ scale: 1.08, y: -2 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
      >
        <GlassesSvg
          shape={product.shape}
          frameColor={product.frameColor}
          lensColor={product.lensColor}
          className="h-auto w-full"
        />
      </motion.div>
      <div className="mt-2 flex flex-col items-center">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-800">
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
    </div>
  );
}
