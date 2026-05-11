import Link from "next/link";

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
  return (
    <footer className="mt-24 border-t bg-background">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI identity & creator commerce layer. Turn your knowledge into
              live, sellable software.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
              All systems normal
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
    </footer>
  );
}
