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
  { tint: string; text: string; borderHover: string }
> = {
  Sparkles: {
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    borderHover: "group-hover:border-indigo-200"
  },
  Bot: {
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    borderHover: "group-hover:border-indigo-200"
  },
  ShoppingBag: {
    tint: "bg-tint-amber",
    text: "text-amber-500",
    borderHover: "group-hover:border-amber-200"
  },
  Cpu: {
    tint: "bg-tint-emerald",
    text: "text-emerald-500",
    borderHover: "group-hover:border-emerald-200"
  },
  Wand2: {
    tint: "bg-tint-violet",
    text: "text-violet-500",
    borderHover: "group-hover:border-violet-200"
  },
  Users: {
    tint: "bg-tint-violet",
    text: "text-violet-500",
    borderHover: "group-hover:border-violet-200"
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
    <section id="features" className="container mt-24 scroll-mt-24 md:mt-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          The platform
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[44px]">
          One identity. Every way to monetize.
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          A modern, AI-native stack that replaces Linktree, Gumroad, Patreon, and
          Character.AI — and adds executable software on top.
        </p>
      </Reveal>

      <div className="mt-12 grid auto-rows-[1fr] gap-3 md:grid-cols-3">
        {features.map((f, i) => {
          const Icon = iconMap[f.icon] ?? Sparkles;
          const accent =
            accentMap[f.icon] ?? {
              tint: "bg-secondary",
              text: "text-foreground",
              borderHover: "group-hover:border-border"
            };
          const cfg = layout[i] ?? { span: "" };
          return (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card",
                cfg.span
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70",
                  accent.tint
                )}
              />
              <div className="relative flex items-start justify-between p-6">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors",
                    accent.text,
                    accent.borderHover
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
              <div className="relative px-6 pb-6">
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
      <div className="rounded-xl border bg-background p-3 shadow-soft">
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
      <div className="overflow-hidden rounded-xl border bg-background shadow-soft">
        <div className="flex items-center gap-2 border-b px-3 py-2 text-[10px] font-mono text-muted-foreground">
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
            className="rounded-md border bg-background px-2 py-1 text-[11px] font-medium"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
