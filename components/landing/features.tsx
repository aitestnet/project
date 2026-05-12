"use client";

import {
  Sparkles,
  Bot,
  ShoppingBag,
  Cpu,
  Wand2,
  Users,
  ArrowUpRight,
  type LucideIcon
} from "lucide-react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/site/reveal";
import { features } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Bot,
  ShoppingBag,
  Cpu,
  Wand2,
  Users
};

const accentMap: Record<
  string,
  { tint: string; text: string; borderHover: string; glow: string }
> = {
  Sparkles: {
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    borderHover: "group-hover:border-indigo-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(238_86%_70%/0.15)]"
  },
  Bot: {
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    borderHover: "group-hover:border-indigo-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(238_86%_70%/0.15)]"
  },
  ShoppingBag: {
    tint: "bg-tint-amber",
    text: "text-amber-500",
    borderHover: "group-hover:border-amber-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(36_100%_60%/0.15)]"
  },
  Cpu: {
    tint: "bg-tint-emerald",
    text: "text-emerald-500",
    borderHover: "group-hover:border-emerald-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(160_70%_55%/0.15)]"
  },
  Wand2: {
    tint: "bg-tint-violet",
    text: "text-violet-500",
    borderHover: "group-hover:border-violet-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(280_84%_70%/0.15)]"
  },
  Users: {
    tint: "bg-tint-violet",
    text: "text-violet-500",
    borderHover: "group-hover:border-violet-200/80",
    glow: "group-hover:shadow-[0_0_24px_-4px_hsl(280_84%_70%/0.15)]"
  }
};

const layout: { span: string; preview?: "chat" | "products" | "runtime" }[] = [
  { span: "md:col-span-2 md:row-span-2", preview: "chat" },
  { span: "md:col-span-1" },
  { span: "md:col-span-1" },
  { span: "md:col-span-1", preview: "runtime" },
  { span: "md:col-span-1", preview: "products" },
  { span: "md:col-span-2" }
];

export function Features() {
  return (
    <section id="features" className="container scroll-mt-24 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          The platform
        </p>
        <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.025em] text-gradient sm:text-[44px]">
          One identity. Every way to monetize.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          A modern, AI-native stack that replaces Linktree, Gumroad, Patreon, and
          Character.AI — and adds executable software on top.
        </p>
      </Reveal>

      <div className="mt-14 grid auto-rows-[1fr] gap-3 md:grid-cols-3">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon] ?? Sparkles;
          const accent =
            accentMap[f.icon] ?? {
              tint: "bg-secondary",
              text: "text-foreground",
              borderHover: "group-hover:border-border",
              glow: ""
            };
          const cfg = layout[i] ?? { span: "" };
          return (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/50 transition-all duration-300 card-hover",
                accent.glow,
                cfg.span
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60",
                  accent.tint
                )}
              />
              <div className="relative flex items-start justify-between p-6">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background transition-colors duration-300",
                    accent.text,
                    accent.borderHover
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="relative px-6 pb-6">
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
              {cfg.preview === "chat" && <FeaturePreviewChat />}
              {cfg.preview === "runtime" && <FeaturePreviewRuntime />}
              {cfg.preview === "products" && <FeaturePreviewProducts />}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function FeaturePreviewChat() {
  return (
    <div className="mt-auto px-6 pb-6">
      <div className="rounded-xl border border-border/50 bg-background p-3 shadow-soft">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
          <span className="font-mono">yogi.ai · AI twin</span>
        </div>
        <div className="mt-3 space-y-2">
          <p className="max-w-[80%] rounded-2xl rounded-tl-md bg-secondary px-3 py-2 text-[12px]">
            Welcome — looking for an AI tool or a workflow?
          </p>
          <p className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-foreground px-3 py-2 text-[12px] text-background">
            An AI SEO tool, ideally a live one.
          </p>
          <p className="max-w-[80%] rounded-2xl rounded-tl-md bg-secondary px-3 py-2 text-[12px]">
            Perfect — my <span className="font-mono">seo.yogi.ai</span> ships in 30s.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturePreviewRuntime() {
  return (
    <div className="mt-auto px-6 pb-6">
      <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-soft">
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-2 text-[10px] font-mono text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
          $ dokploy deploy
        </div>
        <div className="space-y-1 px-3 py-2 font-mono text-[10px]">
          <p className="text-muted-foreground">
            <span className="text-foreground">→</span> building image…
          </p>
          <p className="text-muted-foreground">
            <span className="text-foreground">→</span> pushing to registry…
          </p>
          <p className="text-emerald-600">
            ✓ live at seo.yogi.ai
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturePreviewProducts() {
  return (
    <div className="mt-auto px-6 pb-6">
      <div className="flex flex-wrap gap-1.5">
        {["Ebook", "Prompt", "Workflow", "Template", "Mini SaaS", "Membership"].map((p) => (
          <span
            key={p}
            className="rounded-md border border-border/50 bg-background px-2 py-1 text-[11px] font-medium transition-colors hover:border-foreground/20"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
