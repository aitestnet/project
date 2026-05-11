"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";

const codeLines = [
  { prefix: "$", text: "teskel new yogi.ai", c: "text-emerald-400" },
  { prefix: " ", text: "→ identity page    https://yogi.ai", c: "text-zinc-400" },
  { prefix: " ", text: "→ persona engine   ready", c: "text-zinc-400" },
  { prefix: " ", text: "→ commerce         stripe + lemon", c: "text-zinc-400" },
  { prefix: "$", text: "teskel ship seo-tool ./", c: "text-emerald-400" },
  { prefix: " ", text: "→ build            12.4s", c: "text-zinc-400" },
  { prefix: " ", text: "→ deploy           sin1, fra1, sfo1", c: "text-zinc-400" },
  { prefix: " ", text: "→ ssl              issued", c: "text-zinc-400" },
  { prefix: " ", text: "✓ live at seo.yogi.ai (28s)", c: "text-emerald-300" }
];

const features = [
  {
    Icon: Sparkles,
    title: "One CLI for everything",
    body: "Create a handle, train a persona, ship products, deploy runtimes — all from teskel."
  },
  {
    Icon: Layers,
    title: "Composable on every layer",
    body: "Swap LLMs via LiteLLM, payments via Stripe / Lemon / Polar, infra via Dokploy."
  },
  {
    Icon: Workflow,
    title: "API + webhooks, day one",
    body: "Hook Teskel into n8n, Zapier, or your stack. Everything you see has a webhook."
  }
];

export function DeepDive() {
  return (
    <section className="relative mt-24 md:mt-32 overflow-hidden border-y panel-dark text-white">
      <div className="pointer-events-none absolute inset-0 grid-lines-dark" />
      <div className="pointer-events-none absolute inset-0 mesh-dark opacity-40" />

      <div className="container relative py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
              Built for builders
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl lg:text-[44px]">
              <span className="text-shimmer-light">Composable</span> creator
              infrastructure.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
              Teskel is opinionated where it should be (an identity, a persona,
              an executable runtime) and unopinionated everywhere else. Use our
              cloud or run it on your own infra. It&rsquo;s your stack.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map((f) => (
                <li key={f.title} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-indigo-300">
                    <f.Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-white">
                      {f.title}
                    </p>
                    <p className="text-[13px] leading-relaxed text-white/60">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90"
              >
                <Link href="/dashboard">
                  Open the dashboard
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white"
              >
                <Link href="/discover">Browse the API</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/10 bg-black/40 shadow-elev backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-3 font-mono text-[10px] text-white/70">
                    ~/teskel — main
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/70">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  zsh
                </span>
              </div>
              <div className="px-5 py-5 font-mono text-[12.5px] leading-relaxed">
                {codeLines.map((l, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.32,
                      delay: 0.15 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="flex gap-2"
                  >
                    <span className="text-white/30">{l.prefix}</span>
                    <span className={l.c}>{l.text}</span>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="flex gap-2 text-white/80 caret-blink"
                >
                  <span className="text-white/30">$</span>
                  <span> </span>
                </motion.div>
              </div>

              <div className="border-t border-white/10 px-5 py-3 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                <span className="text-emerald-400">9,215</span> active runtimes
                · region: sin1 · 99.99% uptime
              </div>
            </motion.div>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
              {[
                "Stripe",
                "Lemon Squeezy",
                "Polar",
                "Dokploy",
                "Docker",
                "LiteLLM",
                "Mem0",
                "Qdrant",
                "Prisma",
                "n8n",
                "Meilisearch",
                "PostHog"
              ].map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
