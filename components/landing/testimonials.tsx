"use client";

import { Quote } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Reveal } from "@/components/site/reveal";

const items = [
  {
    quote:
      "I replaced my Linktree, Gumroad, and ConvertKit with a single Teskel page. My AI persona handles support while I sleep.",
    name: "Aria Saraswati",
    handle: "aria.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Aria&backgroundColor=f5f5f5"
  },
  {
    quote:
      "Selling a live AI SEO tool instead of a PDF doubled my pricing. Dokploy makes it boring-easy to ship.",
    name: "Yogi Pradana",
    handle: "yogi.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=f5f5f5"
  },
  {
    quote:
      "My AI twin onboards new students 24/7. Conversion to paid memberships went from 3% to 11%.",
    name: "Lina Park",
    handle: "lina.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Lina&backgroundColor=f5f5f5"
  },
  {
    quote:
      "I shipped a $9 mini SaaS from a prompt-pack idea in one weekend. Dokploy gave me SSL + a subdomain in 60 seconds.",
    name: "Kenji Watanabe",
    handle: "kenji.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Kenji&backgroundColor=f5f5f5"
  },
  {
    quote:
      "The persona engine understands my tone better than my own intern. Visitors actually convert from chat.",
    name: "Noor Hadi",
    handle: "noor.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Noor&backgroundColor=f5f5f5"
  },
  {
    quote:
      "One page replaced four SaaS tools. The numbers stack up — I'm saving ~$120/mo and selling more.",
    name: "Ravi Anand",
    handle: "ravi.ai",
    avatar:
      "https://api.dicebear.com/9.x/notionists/svg?seed=Ravi&backgroundColor=f5f5f5"
  }
];

const accentByHandle: Record<string, string> = {
  "aria.ai": "text-violet-500",
  "yogi.ai": "text-indigo-500",
  "lina.ai": "text-violet-500",
  "kenji.ai": "text-amber-500",
  "noor.ai": "text-emerald-500",
  "ravi.ai": "text-indigo-500"
};

function TestimonialCard({ t }: { t: (typeof items)[number] }) {
  const accent = accentByHandle[t.handle] ?? "text-foreground";
  return (
    <figure className="w-[340px] shrink-0 rounded-2xl border border-border/50 bg-card/50 p-5 transition-all duration-300 card-hover sm:w-[400px]">
      <Quote className={`h-4 w-4 ${accent} opacity-60`} />
      <blockquote className="mt-3 text-[14px] leading-relaxed text-foreground/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar className="h-9 w-9 ring-1 ring-border/50">
          <AvatarImage src={t.avatar} />
          <AvatarFallback>{t.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{t.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{t.handle}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rowA = [...items, ...items];
  const rowB = [...items.slice().reverse(), ...items.slice().reverse()];

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Loved by builders
          </p>
          <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.025em] text-gradient sm:text-[44px]">
            What creators say
          </h2>
        </Reveal>

        <Reveal className="mt-8 flex items-center justify-center gap-3" delay={0.1}>
          <div className="flex -space-x-2">
            {items.slice(0, 6).map((t) => (
              <Avatar
                key={t.handle}
                className="h-7 w-7 ring-2 ring-background"
              >
                <AvatarImage src={t.avatar} />
                <AvatarFallback className="text-[10px]">
                  {t.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-[12px] text-muted-foreground">
            <span className="font-medium text-foreground">4.9 / 5</span> from
            early creators
          </p>
        </Reveal>
      </div>

      <div className="pause-on-hover mt-14 space-y-3 mask-edges-x">
        <div className="relative overflow-hidden">
          <div className="marquee flex w-max gap-3">
            {rowA.map((t, i) => (
              <TestimonialCard key={`a-${t.handle}-${i}`} t={t} />
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div className="marquee-reverse flex w-max gap-3">
            {rowB.map((t, i) => (
              <TestimonialCard key={`b-${t.handle}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
