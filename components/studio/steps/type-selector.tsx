"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  FileText,
  Sparkles,
  BookOpen,
  Workflow,
  Database,
  Bot,
  Github,
  Wrench
} from "lucide-react";

const OFFER_TYPES = [
  {
    id: "mini-saas",
    title: "Mini SaaS",
    description: "Deploy a live app from a GitHub repo. Auto SSL, auto subdomain.",
    icon: Cpu,
    runtime: "executable" as const,
    badge: "Flagship"
  },
  {
    id: "ai-workflow",
    title: "AI Workflow",
    description: "Sell an AI-powered automation or agent pipeline.",
    icon: Workflow,
    runtime: "executable" as const
  },
  {
    id: "ebook",
    title: "E-Book / Guide",
    description: "Long-form written content, PDFs, or digital guides.",
    icon: BookOpen,
    runtime: "static" as const
  },
  {
    id: "prompt-pack",
    title: "Prompt Pack",
    description: "Curated AI prompts for ChatGPT, Midjourney, Stable Diffusion.",
    icon: Sparkles,
    runtime: "static" as const
  },
  {
    id: "template",
    title: "Template / Starter",
    description: "Notion, Figma, code boilerplates, or design kits.",
    icon: FileText,
    runtime: "static" as const
  },
  {
    id: "dataset",
    title: "Dataset / API",
    description: "Sell curated data, trained models, or API access keys.",
    icon: Database,
    runtime: "static" as const
  },
  {
    id: "automation",
    title: "Automation Pack",
    description: "n8n workflows, Zapier templates, or scripted automations.",
    icon: Wrench,
    runtime: "static" as const
  },
  {
    id: "ai-agent",
    title: "AI Agent",
    description: "A trained AI agent that performs tasks for your customers.",
    icon: Bot,
    runtime: "executable" as const
  }
];

export function TypeSelector({
  data,
  onChange
}: {
  data: any;
  onChange: (kind: string, runtime: "static" | "executable", repoUrl?: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-bold tracking-tight">What offer are you publishing?</h2>
        <p className="mt-2 text-muted-foreground">
          Choose the offer format. Teskel will connect it to your public identity, proof, and AI persona routing.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {OFFER_TYPES.map((t, idx) => {
          const isSelected = data.kind === t.id;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(t.id, t.runtime, "")}
              className={`group relative flex h-full flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-lg shadow-primary/5"
                  : "bg-card hover:border-foreground/20 hover:bg-accent/50"
              }`}
            >
              {t.badge && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
                  {t.badge}
                </span>
              )}
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground group-hover:bg-foreground/10"
                  }`}
                >
                  <t.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground leading-tight">{t.title}</h3>
                  {t.runtime === "executable" && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-emerald-500">
                      Live Runtime
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
