"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

type Props = { onStart: () => void };

export function IntroScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
        className="text-[11px] uppercase tracking-[0.3em] text-zinc-400"
      >
        Sun · Finder
      </motion.div>
      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.5, type: "spring", damping: 22, stiffness: 220 },
        }}
        className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-900 md:text-6xl"
      >
        Find the pair
        <br />
        that matches you.
      </motion.h1>
      <motion.p
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
        className="mt-5 max-w-md text-zinc-500"
      >
        Four short questions. Twenty silhouettes. Watch them rearrange around
        your taste.
      </motion.p>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.9 } }}
        className="pointer-events-auto mt-8"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="h-12 rounded-full px-8 text-base"
        >
          Begin
        </Button>
      </motion.div>
    </motion.div>
  );
}
