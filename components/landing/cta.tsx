"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, AtSign, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  const [handle, setHandle] = useState("");
  const cleaned = handle
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24);
  const available = cleaned.length >= 3;

  return (
    <section className="container mt-24 md:mt-32">
      <div className="relative overflow-hidden rounded-3xl border bg-foreground px-6 py-14 text-background md:px-12 md:py-20">
        <div aria-hidden className="absolute inset-0 mesh-dark" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 select-none font-display text-[280px] font-semibold leading-none tracking-[-0.04em] text-background/[0.04] md:text-[420px]"
        >
          .ai
        </div>

        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.02em] md:text-[48px]">
            <span className="text-shimmer-light">Your AI identity is waiting.</span>
          </h2>
          <p className="mt-4 text-[15px] text-background/75">
            Claim your handle, train your AI twin, and start selling live software
            in minutes.
          </p>

          <form
            className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-1 items-center rounded-lg bg-background/10 px-3 ring-1 ring-background/15 backdrop-blur transition-shadow focus-within:ring-2 focus-within:ring-background/40 sm:max-w-sm">
              <AtSign className="h-4 w-4 text-background/60" />
              <input
                value={cleaned}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                className="w-full bg-transparent px-2 py-2.5 text-sm text-background placeholder:text-background/50 outline-none"
              />
              <span className="font-mono text-sm text-background/60">.ai</span>
              {available && (
                <Check className="ml-2 h-3.5 w-3.5 text-emerald-400" />
              )}
            </label>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={`/sign-up${cleaned ? `?u=${cleaned}` : ""}`}>
                Reserve {cleaned ? `${cleaned}.ai` : "your handle"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>
          <p className="mt-3 text-xs text-background/50">
            Free forever for hobbyists. No credit card required.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[11px] uppercase tracking-[0.16em] text-background/40">
              Try one:
            </span>
            {["founder", "makes", "studio", "ship", "thinks"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setHandle(s)}
                className="rounded-full border border-background/15 bg-background/5 px-2.5 py-1 font-mono text-[11px] text-background/70 transition-colors hover:border-background/40 hover:text-background"
              >
                {s}.ai
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
