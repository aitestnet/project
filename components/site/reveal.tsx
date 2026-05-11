"use client";

import * as React from "react";
import { motion, type MotionProps, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  viewport?: MotionProps["viewport"];
};

export function Reveal({
  className,
  children,
  delay = 0,
  y = 14,
  duration = 0.55,
  viewport = { once: true, margin: "-60px" }
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0 }
  };
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={viewport}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
