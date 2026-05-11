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
      "Pick a handle and get a beautiful identity page. Use a custom domain if you want."
  },
  {
    icon: Bot,
    title: "Train your AI persona",
    description:
      "Drop notes, links, or files. Your AI twin learns your tone, expertise, and offers."
  },
  {
    icon: Box,
    title: "Publish products",
    description:
      "Add ebooks, prompts, workflows, memberships — or upload a repo for a live mini SaaS."
  },
  {
    icon: Plug,
    title: "Connect commerce",
    description:
      "Plug in Stripe, Lemon Squeezy, or Polar. Your AI upsells and onboards 24/7."
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
    <section className="container mt-24 md:mt-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          How it works
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[44px]">
          From handle to a live AI business in 15 minutes.
        </h2>
      </Reveal>

      <div ref={ref} className="relative mt-12">
        <div className="pointer-events-none absolute left-6 right-6 top-[42px] hidden h-px bg-border md:block" />
        <motion.div
          style={{ width: lineWidth }}
          className="pointer-events-none absolute left-6 top-[42px] hidden h-px bg-foreground md:block"
        />

        <div className="relative grid gap-3 md:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease }}
              className="relative"
            >
              <div className="flex h-full flex-col rounded-2xl border bg-card p-6 transition-shadow hover:shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{i + 1}
                  </span>
                  <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg border bg-background text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                    <s.icon className="h-4 w-4" />
                  </div>
                </div>
                <h3 className="mt-5 text-[15px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
