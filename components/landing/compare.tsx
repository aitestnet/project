"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

type Cell = "yes" | "no" | "partial" | string;

type Row = {
  feature: string;
  detail?: string;
  teskel: Cell;
  linktree: Cell;
  gumroad: Cell;
  patreon: Cell;
  characterai: Cell;
};

const rows: Row[] = [
  {
    feature: "AI persona of yourself",
    detail: "Trained on your tone, products, and knowledge",
    teskel: "yes",
    linktree: "no",
    gumroad: "no",
    patreon: "no",
    characterai: "partial"
  },
  {
    feature: "Live, executable mini SaaS",
    detail: "Auto-deployed via Dokploy with SSL + subdomain",
    teskel: "yes",
    linktree: "no",
    gumroad: "no",
    patreon: "no",
    characterai: "no"
  },
  {
    feature: "Digital product checkout",
    detail: "Stripe + Lemon Squeezy + Polar built-in",
    teskel: "yes",
    linktree: "partial",
    gumroad: "yes",
    patreon: "partial",
    characterai: "no"
  },
  {
    feature: "Memberships & recurring",
    detail: "Subscriptions, tiers, gated content",
    teskel: "yes",
    linktree: "no",
    gumroad: "partial",
    patreon: "yes",
    characterai: "no"
  },
  {
    feature: "Custom domain (you.ai)",
    teskel: "yes",
    linktree: "partial",
    gumroad: "partial",
    patreon: "no",
    characterai: "no"
  },
  {
    feature: "Self-hostable runtime",
    detail: "Bring your own infra via Dokploy",
    teskel: "yes",
    linktree: "no",
    gumroad: "no",
    patreon: "no",
    characterai: "no"
  },
  {
    feature: "AI commerce layer",
    detail: "AI upsells, onboards, supports buyers 24/7",
    teskel: "yes",
    linktree: "no",
    gumroad: "no",
    patreon: "no",
    characterai: "partial"
  },
  {
    feature: "Commission on sales",
    teskel: "0%",
    linktree: "—",
    gumroad: "10%",
    patreon: "8–12%",
    characterai: "—"
  }
];

const columns: {
  key: keyof Omit<Row, "feature" | "detail">;
  label: string;
  highlight?: boolean;
}[] = [
  { key: "teskel", label: "Teskel", highlight: true },
  { key: "linktree", label: "Linktree" },
  { key: "gumroad", label: "Gumroad" },
  { key: "patreon", label: "Patreon" },
  { key: "characterai", label: "Character.AI" }
];

function CellView({ value, highlight }: { value: Cell; highlight?: boolean }) {
  if (value === "yes") {
    return (
      <span
        className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-lg border",
          highlight
            ? "border-indigo-200/80 bg-tint-indigo text-indigo-600"
            : "border-border/50 bg-card text-emerald-500"
        )}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === "no") {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-border/50 bg-card text-muted-foreground/30">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex items-center rounded-lg border border-border/50 bg-card px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/70">
        Partial
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold",
        highlight
          ? "border-indigo-200/80 bg-tint-indigo text-indigo-600"
          : "border-border/50 bg-card text-foreground"
      )}
    >
      {value}
    </span>
  );
}

export function Compare() {
  return (
    <section id="compare" className="container scroll-mt-24 py-24 md:py-32">
      <div className="mb-12 max-w-3xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Why teskel
        </p>
        <h2 className="mt-4 font-display text-[30px] font-semibold tracking-[-0.025em] text-gradient text-balance sm:text-[38px] lg:text-[44px]">
          One platform for what used to take four.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-muted-foreground">
          Linktree gave you links. Gumroad gave you a checkout. Patreon gave you
          recurring. Character.AI gave you a persona. Teskel gives you all four
          — plus the ability to ship real, runnable software.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 shadow-premium"
      >
        <span aria-hidden className="pointer-events-none absolute inset-0 mesh-soft opacity-80" />
        <div className="relative overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border/50 bg-background/40">
                <th className="w-[40%] px-5 py-4 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Capability
                </th>
                {columns.map((c) => (
                  <th
                    key={c.key}
                    className={cn(
                      "px-3 py-4 text-center text-[12px] font-semibold",
                      c.highlight
                        ? "text-indigo-600"
                        : "text-muted-foreground/70"
                    )}
                  >
                    <div className="inline-flex items-center gap-1.5">
                      {c.highlight && (
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      )}
                      {c.label}
                      {c.highlight && (
                        <span className="rounded-full bg-tint-indigo px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-indigo-600">
                          this
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={cn(
                    "border-b border-border/40 last:border-0 transition-colors hover:bg-background/50",
                    i % 2 === 0 ? "bg-transparent" : "bg-background/20"
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="text-[14px] font-medium text-foreground">
                      {r.feature}
                    </div>
                    {r.detail && (
                      <div className="mt-0.5 text-[12px] text-muted-foreground/70">
                        {r.detail}
                      </div>
                    )}
                  </td>
                  {columns.map((c) => (
                    <td key={c.key} className="px-3 py-4 text-center">
                      <CellView value={r[c.key]} highlight={c.highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="mt-5 text-[12px] text-muted-foreground/60">
        Comparison is based on publicly listed features as of 2026. Logos &amp;
        names belong to their respective owners.
      </p>
    </section>
  );
}
