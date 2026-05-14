"use client";

import { motion } from "motion/react";
import {
  Activity,
  Building2,
  Car,
  Disc3,
  Minus,
  Mountain,
  WavesHorizontal,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Question } from "@/lib/questions";
import type { Shape } from "@/lib/products";
import { OptionCard } from "./option-card";
import { GlassesSvg } from "./glasses-svg";
import { Progress } from "@/components/ui/progress";

type Props = {
  question: Question;
  stepIndex: number;
  totalSteps: number;
  onAnswer: (key: string, value: string) => void;
};

const styleIcons: Record<string, LucideIcon> = {
  minimal: Minus,
  retro: Disc3,
  bold: Zap,
  sporty: Activity,
};
const usageIcons: Record<string, LucideIcon> = {
  city: Building2,
  beach: WavesHorizontal,
  driving: Car,
  mountain: Mountain,
};
const paletteSwatches: Record<string, string[]> = {
  mono: ["#0a0a0a", "#5a5a5a", "#c0c0c0"],
  warm: ["#7a4a28", "#c8a25b", "#c98a8a"],
  cool: ["#1a2a4a", "#4a5a6a", "#a0b8c8"],
  colorful: ["#c43a4a", "#2a6a8a", "#c8a25b"],
};

function visualFor(key: string, value: string) {
  if (key === "style") {
    const Icon = styleIcons[value];
    return Icon ? <Icon className="h-6 w-6" strokeWidth={1.4} /> : null;
  }
  if (key === "usage") {
    const Icon = usageIcons[value];
    return Icon ? <Icon className="h-6 w-6" strokeWidth={1.4} /> : null;
  }
  if (key === "shape") {
    return (
      <GlassesSvg
        shape={value as Shape}
        frameColor="#1a1a1a"
        lensColor="#3a3a3a"
        className="h-auto w-12"
      />
    );
  }
  if (key === "palette") {
    return (
      <div className="flex gap-1.5">
        {paletteSwatches[value]?.map((c, i) => (
          <div
            key={i}
            className="h-4 w-4 rounded-full ring-1 ring-zinc-200/80"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    );
  }
  return null;
}

export function QuestionStep({
  question,
  stepIndex,
  totalSteps,
  onAnswer,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
        exit: { opacity: 0, transition: { duration: 0.25 } },
      }}
      className="pointer-events-none absolute inset-0 flex flex-col"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -12 },
          show: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 22, stiffness: 240 },
          },
          exit: { opacity: 0, y: -6, transition: { duration: 0.18 } },
        }}
        className="flex flex-col items-center gap-3 px-8 pt-12"
      >
        <div className="flex items-center gap-3">
          <div className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 tabular-nums">
            {stepIndex + 1} / {totalSteps}
          </div>
          <Progress value={((stepIndex + 1) / totalSteps) * 100} className="h-1 w-32" />
        </div>
        <h2 className="mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          {question.prompt}
        </h2>
        <p className="text-sm text-zinc-500">{question.hint}</p>
      </motion.div>

      <div className="flex-1" />

      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } },
          exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
        }}
        className="pointer-events-auto flex flex-wrap justify-center gap-3 px-8 pb-10"
      >
        {question.options.map((opt) => (
          <motion.div
            key={opt.value}
            variants={{
              hidden: { opacity: 0, y: 22 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", damping: 22, stiffness: 240 },
              },
              exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
            }}
          >
            <OptionCard
              label={opt.label}
              description={opt.description}
              visual={visualFor(question.key, opt.value)}
              onClick={() => onAnswer(question.key, opt.value)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
