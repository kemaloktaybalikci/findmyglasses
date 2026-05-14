"use client";

import { motion } from "motion/react";
import type { ScoredProduct } from "@/lib/scoring";
import type { Position, Stage } from "@/lib/layout";
import { ProductItem } from "./product-item";

type Props = {
  products: ScoredProduct[];
  positions: Map<string, Position>;
  stage: Stage;
  topId: string | null;
};

export function ProductCloud({ products, positions, stage, topId }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ width: 0, height: 0 }}>
        {products.map((p, idx) => {
          const pos = positions.get(p.id) ?? {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          };
          return (
            <motion.div
              key={p.id}
              className="absolute left-0 top-0"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                x: pos.x,
                y: pos.y,
                scale: pos.scale,
                opacity: pos.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 65,
                damping: 19,
                mass: 1.3,
                delay: stage === "intro" ? idx * 0.035 : 0,
              }}
            >
              <ProductItem
                product={p}
                stage={stage}
                isTop={stage === "result" && p.id === topId}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
