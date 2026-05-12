"use client";

import { Box, Bot, Globe, Plug } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

import { Reveal } from "@/components/site/reveal";

const steps = [
  {
    icon: Globe,
    title: "Claim username.ai",
    description:
      "Pick a handle and get a beautiful identity page. Use a custom domain if you want.",
    text: "text-indigo-500",
    num: "01"
  },
  {
    icon: Bot,
    title: "Train your AI persona",
    description:
      "Drop notes, links, or files. Your AI twin learns your tone, expertise, and offers.",
    text: "text-violet-500",
    num: "02"
  },
  {
    icon: Box,
    title: "Publish products",
    description:
      "Add ebooks, prompts, workflows, memberships — or upload a repo for a live mini SaaS.",
    text: "text-amber-500",
    num: "03"
  },
  {
    icon: Plug,
    title: "Connect commerce",
    description:
      "Plug in Stripe, Lemon Squeezy, or Polar. Your AI upsells and onboards 24/7.",
    text: "text-emerald-500",
    num: "04"
  }
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"]
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="container py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          How it works
        </p>
        <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.025em] text-gradient sm:text-[44px]">
          From handle to live AI business in 15 minutes.
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-14">
        {/* Connection line */}
        <div className="pointer-events-none absolute left-6 right-6 top-[46px] hidden h-px bg-border/60 md:block" />
        <motion.div
          style={{ width: lineWidth }}
          className="pointer-events-none absolute left-6 top-[46px] hidden h-px md:block bg-gradient-to-r from-indigo-400 via-violet-400 to-amber-400"
        />

        <div className="relative grid gap-3 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="relative"
            >
              <div className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 p-6 transition-all duration-300 card-hover">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground/60">
                    {s.num}
                  </span>
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background transition-colors duration-300 ${s.text}`}
                  >
                    <s.icon className="h-[18px] w-[18px]" />
                  </div>
                </div>
                <h3 className="mt-6 text-[15px] font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
