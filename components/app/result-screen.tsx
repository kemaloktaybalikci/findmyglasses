"use client";

import { motion } from "motion/react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "./animated-counter";
import type { ScoredProduct } from "@/lib/scoring";

export type ResultView = "cloud" | "list";

type Props = {
  top: ScoredProduct;
  view: ResultView;
  onViewChange: (v: ResultView) => void;
  onReset: () => void;
};

export function ResultScreen({ top, view, onViewChange, onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="pointer-events-none absolute inset-0 flex flex-col"
    >
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.55, type: "spring", damping: 22 },
        }}
        className="flex flex-col items-center px-8 pt-10 text-center"
      >
        <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
          Your match
        </div>
        <div className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
          {top.name}
        </div>
        <div className="mt-1 text-sm text-zinc-500">{top.tagline}</div>

        <div className="pointer-events-auto mt-5 inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white/85 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-sm">
          <ToggleButton
            active={view === "cloud"}
            onClick={() => onViewChange("cloud")}
            icon={<LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label="Cloud"
          />
          <ToggleButton
            active={view === "list"}
            onClick={() => onViewChange("list")}
            icon={<List className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label="List"
          />
        </div>
      </motion.div>

      <div className="flex-1" />

      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.75, type: "spring", damping: 22 },
        }}
        className="flex flex-col items-center gap-3 px-8 pb-8"
      >
        {view === "cloud" && (
          <div className="flex flex-col items-center">
            <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              Match score
            </div>
            <div className="mt-1 text-5xl font-semibold tracking-tight text-zinc-900 tabular-nums">
              <AnimatedCounter value={top.score} delay={0.3} />
              <span className="text-2xl text-zinc-400">%</span>
            </div>
          </div>
        )}
        <div className="pointer-events-auto">
          <Button
            onClick={onReset}
            variant="outline"
            size="lg"
            className="h-10 rounded-full px-5 text-sm"
          >
            Start over
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ToggleButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
