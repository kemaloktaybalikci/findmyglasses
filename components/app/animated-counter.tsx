"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type Props = {
  value: number;
  delay?: number;
};

export function AnimatedCounter({ value, delay = 0 }: Props) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18, mass: 1 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    const t = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(t);
  }, [motionValue, value, delay]);

  return <motion.span>{rounded}</motion.span>;
}
