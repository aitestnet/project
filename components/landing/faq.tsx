"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

const items: Item[] = [
  {
    q: "What is a `username.ai` page exactly?",
    a: "It's your living creator home: a profile, an AI persona trained on your knowledge, a storefront for digital products and memberships, and a runtime that can host real, executable mini SaaS — all under one handle."
  },
  {
    q: "How is this different from Linktree or Gumroad?",
    a: "Linktree gives you links. Gumroad gives you a checkout. Teskel gives you both, plus an AI twin that chats with visitors, and a runtime that lets you sell real software (not just PDFs) auto-deployed via Dokploy."
  },
  {
    q: "Can I sell live software, not just downloads?",
    a: "Yes — that's the headline feature. Upload a repo (or use one of our templates) and Teskel containerizes it, gives it a subdomain like `seo.you.ai`, issues SSL, and routes payment + access for you."
  },
  {
    q: "What does the AI persona know about me?",
    a: "Whatever you give it: notes, links, docs, past content, product descriptions. We store knowledge in Qdrant, give it long-term memory via Mem0, and you can adjust tone, persona traits, and guardrails any time."
  },
  {
    q: "Which payment processors are supported?",
    a: "Stripe, Lemon Squeezy, and Polar are first-class. MedusaJS is supported for headless commerce setups. We take 0% commission on your product sales — you only pay your processor."
  },
  {
    q: "Is Teskel self-hostable?",
    a: "Yes. The entire stack is OSS-friendly. The runtime engine is Dokploy, which you can self-host on your own VPS. You bring the database (Postgres + Redis + Qdrant) and we have a one-command bootstrap."
  },
  {
    q: "When is this generally available?",
    a: "We're in private beta now. Claim a handle today to get an invite — Creator plan is free during beta, with grandfathered pricing once we ship 1.0."
  }
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section
      id="faq"
      className="container mt-24 md:mt-32 scroll-mt-24"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Common questions
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.025em] text-balance sm:text-4xl">
            Frequently asked.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            Can&rsquo;t find what you&rsquo;re looking for? We&rsquo;re a small
            team and we answer fast.
          </p>
          <a
            href="mailto:hi@teskel.dev"
            className="mt-6 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-[12px] font-medium transition-colors hover:border-foreground/30"
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-500" />
            hi@teskel.dev
          </a>
        </div>

        <div className="lg:col-span-8">
          <ul className="divide-y rounded-2xl border bg-card">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-background/60"
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border bg-background transition-transform",
                        isOpen
                          ? "rotate-45 border-tint-indigo bg-tint-indigo text-indigo-500"
                          : "text-muted-foreground"
                      )}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                    <span className="flex-1 pt-0.5 font-display text-[16px] font-medium tracking-[-0.01em] text-foreground sm:text-[17px]">
                      {it.q}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pl-[64px] text-[14px] leading-relaxed text-muted-foreground">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
