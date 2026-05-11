"use client";

import Link from "next/link";
import * as React from "react";
import { Github, Twitter, Linkedin, Youtube, Globe, ArrowRight } from "lucide-react";

import { Logo } from "@/components/site/logo";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/discover", label: "Discover" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/dashboard", label: "Creator dashboard" }
    ]
  },
  {
    title: "Build",
    links: [
      { href: "#", label: "AI Persona Studio" },
      { href: "#", label: "Executable Runtime" },
      { href: "#", label: "Commerce Engine" },
      { href: "#", label: "API & SDK" }
    ]
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Changelog" },
      { href: "#", label: "Brand" },
      { href: "#", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Terms" },
      { href: "#", label: "Privacy" },
      { href: "#", label: "Acceptable use" },
      { href: "#", label: "Security" }
    ]
  }
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);
  const valid = /.+@.+\..+/.test(email);
  return (
    <footer className="relative mt-24 overflow-hidden border-t bg-background">
      <div className="pointer-events-none absolute inset-0 grid-dots-faint opacity-60" />

      <div className="container relative pt-16">
        <div className="grid items-end gap-6 border-b pb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The teskel weekly
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              Get drops, new templates, and beta invites.
            </h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (valid) setSubscribed(true);
            }}
            className="md:col-span-5"
          >
            <div className="flex flex-col items-stretch gap-2 sm:flex-row">
              <label className="flex flex-1 items-center rounded-xl border bg-background px-3 transition-shadow focus-within:ring-2 focus-within:ring-foreground/15">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={subscribed ? "You're on the list ✓" : "you@domain.com"}
                  disabled={subscribed}
                  className="w-full bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>
              <button
                type="submit"
                disabled={!valid || subscribed}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {subscribed ? "Subscribed" : "Subscribe"}
                {!subscribed && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              One email per week. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>

      <div className="container relative py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI identity & creator commerce layer. Turn your knowledge into
              live, sellable software.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
              All systems normal
              <span className="mx-1 inline-block h-3 w-px bg-border" />
              <span className="font-mono text-[11px]">99.99% uptime / 30d</span>
            </div>
            <div className="mt-5 flex items-center gap-1.5">
              {[
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Youtube, href: "#", label: "YouTube" }
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md border bg-card text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
              <span className="mx-1 inline-block h-4 w-px bg-border" />
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 h-8 text-[11px] font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                <Globe className="h-3 w-3" />
                EN · Global
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold text-foreground">{c.title}</p>
                <ul className="mt-3 space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Teskel Labs, Inc. Built with care.</p>
          <p className="font-mono">
            you<span className="text-foreground">.ai</span> · AI Identity Commerce
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none -mb-24 select-none text-center font-display text-[18vw] font-semibold leading-none tracking-[-0.04em] text-foreground/[0.04]"
      >
        teskel
      </div>
    </footer>
  );
}
