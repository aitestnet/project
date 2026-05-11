"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, AtSign } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTA() {
  const [handle, setHandle] = useState("");
  const cleaned = handle
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 24);

  return (
    <section className="container mt-24 md:mt-32">
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 px-6 py-14 text-white md:px-12 md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_30%_20%,white,transparent_45%)]"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Your AI identity is waiting.
          </h2>
          <p className="mt-4 text-white/75">
            Claim your handle, train your AI twin, and start selling live software
            in minutes.
          </p>

          <form
            className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="flex flex-1 items-center rounded-xl bg-white/10 px-3 ring-1 ring-white/15 backdrop-blur focus-within:ring-2 focus-within:ring-white/50 sm:max-w-sm">
              <AtSign className="h-4 w-4 text-white/60" />
              <input
                value={cleaned}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="yourhandle"
                className="w-full bg-transparent px-2 py-3 text-sm text-white placeholder:text-white/50 outline-none"
              />
              <span className="font-mono text-sm text-white/60">.ai</span>
            </label>
            <Button asChild size="lg" variant="default" className="bg-white text-violet-900 hover:bg-white/90">
              <Link href={`/sign-up${cleaned ? `?u=${cleaned}` : ""}`}>
                Reserve {cleaned ? `${cleaned}.ai` : "your handle"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </form>
          <p className="mt-3 text-xs text-white/50">
            Free forever for hobbyists. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
