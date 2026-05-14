"use client";

import { motion } from "motion/react";

type Props = {
  label: string;
  description: string;
  visual?: React.ReactNode;
  onClick: () => void;
};

export function OptionCard({ label, description, visual, onClick }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative flex w-48 flex-col items-start gap-2 rounded-2xl border border-zinc-200/80 bg-white/80 px-4 py-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-md transition-colors hover:border-zinc-900 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      {visual && (
        <div className="flex h-10 items-center text-zinc-700">{visual}</div>
      )}
      <div className="text-base font-semibold text-zinc-900">{label}</div>
      <div className="text-xs leading-snug text-zinc-500">{description}</div>
    </motion.button>
  );
}
