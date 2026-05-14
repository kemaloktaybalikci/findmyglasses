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
  selectedId: string | null;
  onSelect: (id: string) => void;
  dimmed?: boolean;
};

const MASKS: Partial<Record<Stage, string>> = {
  questioning:
    "linear-gradient(to bottom, transparent 0%, transparent 16%, rgba(0,0,0,0.55) 21%, #000 28%, #000 68%, rgba(0,0,0,0.4) 76%, transparent 82%, transparent 100%)",
  result:
    "linear-gradient(to bottom, transparent 0%, transparent 14%, rgba(0,0,0,0.55) 20%, #000 28%, #000 64%, rgba(0,0,0,0.4) 74%, transparent 82%, transparent 100%)",
};

export function ProductCloud({
  products,
  positions,
  stage,
  topId,
  selectedId,
  onSelect,
  dimmed = false,
}: Props) {
  const mask = MASKS[stage];
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      animate={{ opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: 0.25 }}
      style={
        mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined
      }
    >
      <div className="relative" style={{ width: 0, height: 0 }}>
        {products.map((p, idx) => {
          const pos = positions.get(p.id) ?? {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          };
          const isSelected = selectedId === p.id;
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
                isSelected={isSelected}
                onSelect={onSelect}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
