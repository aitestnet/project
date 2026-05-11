"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, BadgeCheck } from "lucide-react";

import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { discoverCreators } from "@/lib/data";
import { formatCompactNumber, initials } from "@/lib/utils";

const niches = ["All", "AI x SaaS", "Design", "Finance", "Wellness", "Audio", "Education"];

export default function DiscoverPage() {
  const [q, setQ] = React.useState("");
  const [niche, setNiche] = React.useState("All");

  const filtered = discoverCreators.filter((c) => {
    const matchNiche = niche === "All" || c.niche === niche;
    const matchQ =
      q === "" ||
      `${c.name} ${c.username} ${c.tagline} ${c.topProduct}`
        .toLowerCase()
        .includes(q.toLowerCase());
    return matchNiche && matchQ;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="container py-12">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="rounded-full text-[11px] font-medium">
              <Sparkles className="mr-1 h-3 w-3" />
              Discover
            </Badge>
            <h1 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] md:text-[40px]">
              Find creators with AI twins you can chat with.
            </h1>
            <p className="mt-3 text-muted-foreground">
              Explore identity pages, clone workflows, and join memberships from
              builders across the world.
            </p>
            <div className="mt-6 flex items-center gap-2 rounded-xl border bg-card p-1.5 pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search creators, niches, products…"
                className="flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm">Search</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {niches.map((n) => (
                <button
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    niche === n
                      ? "border-foreground bg-foreground text-background"
                      : "bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="container pb-16">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
              No creators match your filters yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((c) => (
                <Link
                  href={`/${c.username}`}
                  key={c.username}
                  className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-11 w-11 ring-1 ring-border">
                      <AvatarImage src={c.avatar} />
                      <AvatarFallback>{initials(c.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 truncate font-semibold leading-tight">
                        {c.name}
                        {c.verified && (
                          <BadgeCheck className="h-4 w-4 fill-foreground text-background" />
                        )}
                      </p>
                      <p className="truncate font-mono text-xs text-muted-foreground">
                        {c.username}.ai
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/85">{c.tagline}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      AI persona online
                    </span>
                    <span>{formatCompactNumber(c.followers)} followers</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl border bg-background/80 px-3 py-2 text-xs">
                    <span>
                      Top product · <span className="font-medium">{c.topProduct}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
