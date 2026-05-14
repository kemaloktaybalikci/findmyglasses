"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "./animated-counter";
import type { ScoredProduct } from "@/lib/scoring";

type Props = {
  top: ScoredProduct;
  onReset: () => void;
};

export function ResultScreen({ top, onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="pointer-events-none absolute inset-0 flex flex-col"
    >
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.7, type: "spring", damping: 22 },
        }}
        className="flex flex-col items-center px-8 pt-12 text-center"
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          Your match
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          {top.name}
        </div>
        <div className="mt-1 text-sm text-zinc-500">{top.tagline}</div>
      </motion.div>

      <div className="flex-1" />

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.9, type: "spring", damping: 22 },
        }}
        className="flex flex-col items-center gap-4 px-8 pb-10"
      >
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
            Match score
          </div>
          <div className="mt-1 text-6xl font-semibold tracking-tight text-zinc-900 tabular-nums">
            <AnimatedCounter value={top.score} delay={0.4} />
            <span className="text-3xl text-zinc-400">%</span>
          </div>
        </div>
        <div className="pointer-events-auto">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="h-11 rounded-full px-6 text-sm"
          >
            Start over
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
