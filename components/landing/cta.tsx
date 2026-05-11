"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, AtSign, Check, Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const taken = new Set(["yogi", "aria", "noor", "lina", "kenji", "ravi", "admin", "root"]);

export function CTA() {
  const [handle, setHandle] = useState("");
  const cleaned = handle
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24);
  const tooShort = cleaned.length > 0 && cleaned.length < 3;
  const isTaken = cleaned.length >= 3 && taken.has(cleaned);
  const available = cleaned.length >= 3 && !isTaken;
  const status = useMemo(() => {
    if (!cleaned) return null;
    if (tooShort) return { kind: "checking" as const, label: "Keep typing…" };
    if (isTaken) return { kind: "taken" as const, label: "Already taken" };
    return { kind: "ok" as const, label: "Available" };
  }, [cleaned, tooShort, isTaken]);

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

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-background/15 bg-background/5 px-3 py-1 text-[11px] font-medium text-background/70">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 text-emerald-400 pulse-dot" />
            123 handles claimed in the last hour
          </span>
          <h2 className="mt-5 font-display text-[36px] font-semibold leading-[1.02] tracking-[-0.025em] md:text-[60px]">
            <span className="text-shimmer-light">Your AI identity is waiting.</span>
          </h2>
          <p className="mt-4 text-[15px] text-background/75 md:text-[16px]">
            Claim your handle, train your AI twin, and start selling live
            software in minutes.
          </p>

          <form
            className="mx-auto mt-9 flex max-w-2xl flex-col items-stretch gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-1 items-center rounded-xl bg-background/10 px-4 ring-1 ring-background/15 backdrop-blur transition-shadow focus-within:ring-2 focus-within:ring-background/40">
              <AtSign className="h-4 w-4 text-background/60" />
              <input
                value={cleaned}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                className="w-full bg-transparent px-2.5 py-3.5 text-[16px] text-background placeholder:text-background/50 outline-none"
              />
              <span className="font-mono text-[14px] text-background/60">.ai</span>
              {status && (
                <span
                  className={
                    "ml-3 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium " +
                    (status.kind === "ok"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : status.kind === "taken"
                      ? "bg-red-400/15 text-red-300"
                      : "bg-background/10 text-background/60")
                  }
                >
                  {status.kind === "ok" && <Check className="h-3 w-3" />}
                  {status.kind === "taken" && <X className="h-3 w-3" />}
                  {status.kind === "checking" && (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  )}
                  {status.label}
                </span>
              )}
            </label>
            <Button
              asChild
              size="lg"
              disabled={!available}
              className="h-auto bg-background text-foreground hover:bg-background/90 disabled:opacity-50 sm:px-6"
            >
              <Link
                href={available ? `/sign-up?u=${cleaned}` : "#"}
                aria-disabled={!available}
              >
                Reserve {available ? `${cleaned}.ai` : "your handle"}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>
          <p className="mt-3 text-[12px] text-background/50">
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
