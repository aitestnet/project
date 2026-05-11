"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Brush,
  Code2,
  GraduationCap,
  Mic2,
  Sparkles
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";
import { initials } from "@/lib/utils";

type Persona = {
  role: string;
  Icon: LucideIcon;
  handle: string;
  name: string;
  blurb: string;
  products: string[];
  tint: string;
  text: string;
  dot: string;
  ringHover: string;
};

const personas: Persona[] = [
  {
    role: "AI Engineer",
    Icon: Code2,
    handle: "yogi.ai",
    name: "Yogi P.",
    blurb: "Sells prompt packs + mini SaaS, books mentoring calls.",
    products: ["Prompt pack", "AI SEO tool", "1:1 calls"],
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    dot: "bg-indigo-500 text-indigo-500",
    ringHover: "group-hover:ring-indigo-200"
  },
  {
    role: "Designer",
    Icon: Brush,
    handle: "aria.ai",
    name: "Aria S.",
    blurb: "Brand kits, design systems, private community.",
    products: ["Brand kit", "Figma system", "Membership"],
    tint: "bg-tint-violet",
    text: "text-violet-500",
    dot: "bg-violet-500 text-violet-500",
    ringHover: "group-hover:ring-violet-200"
  },
  {
    role: "Educator",
    Icon: GraduationCap,
    handle: "noor.ai",
    name: "Noor R.",
    blurb: "Cohorts + AI tutor that answers students 24/7.",
    products: ["Cohort", "AI tutor", "Workbook"],
    tint: "bg-tint-emerald",
    text: "text-emerald-500",
    dot: "bg-emerald-500 text-emerald-500",
    ringHover: "group-hover:ring-emerald-200"
  },
  {
    role: "Indie hacker",
    Icon: Sparkles,
    handle: "kenji.ai",
    name: "Kenji T.",
    blurb: "Ships micro-tools weekly, monetizes via subscriptions.",
    products: ["Lo-fi gen", "Idea bank", "Pro plan"],
    tint: "bg-tint-amber",
    text: "text-amber-500",
    dot: "bg-amber-500 text-amber-500",
    ringHover: "group-hover:ring-amber-200"
  },
  {
    role: "Coach",
    Icon: Bot,
    handle: "ravi.ai",
    name: "Ravi M.",
    blurb: "AI twin answers coaching questions between sessions.",
    products: ["Program", "AI twin", "Workbook"],
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    dot: "bg-indigo-500 text-indigo-500",
    ringHover: "group-hover:ring-indigo-200"
  },
  {
    role: "Musician",
    Icon: Mic2,
    handle: "lina.ai",
    name: "Lina K.",
    blurb: "Sample packs, sync licensing, fan-only memberships.",
    products: ["Sample pack", "Stems", "Fan club"],
    tint: "bg-tint-violet",
    text: "text-violet-500",
    dot: "bg-violet-500 text-violet-500",
    ringHover: "group-hover:ring-violet-200"
  }
];

export function UseCases() {
  return (
    <section className="container mt-24 md:mt-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Built for every kind of creator
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[44px]">
          One identity. Infinite shapes.
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          Teskel adapts to your craft — whether you ship software, sell design,
          teach, or perform.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {personas.map((p, i) => (
          <motion.article
            key={p.handle}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.05,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-80",
                p.tint
              )}
            />
            <div className="relative flex items-center gap-3">
              <Avatar
                className={cn(
                  "h-10 w-10 ring-2 ring-background transition-all",
                  p.ringHover
                )}
              >
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${p.name}&backgroundColor=transparent`}
                />
                <AvatarFallback>{initials(p.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">
                  {p.name}
                </p>
                <p className="truncate font-mono text-[11px] text-muted-foreground">
                  {p.handle}
                </p>
              </div>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                  p.text
                )}
              >
                <p.Icon className="h-3.5 w-3.5" />
              </span>
            </div>

            <p className="relative mt-4 text-[13px] leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>

            <div className="relative mt-4 flex flex-wrap gap-1.5">
              {p.products.map((pr) => (
                <Badge
                  key={pr}
                  variant="outline"
                  className="rounded-md text-[10.5px] font-medium"
                >
                  {pr}
                </Badge>
              ))}
            </div>

            <div className="relative mt-4 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{p.role}</span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <span
                  className={cn(
                    "inline-flex h-1.5 w-1.5 rounded-full pulse-dot",
                    p.dot
                  )}
                />
                <span>Live</span>
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
