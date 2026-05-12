"use client";

const handles = [
  { name: "Product Hunt", style: "italic" },
  { name: "Hacker News", style: "mono" },
  { name: "Indie Hackers", style: "bold" },
  { name: "TechCrunch", style: "display" },
  { name: "a16z", style: "serif" },
  { name: "Lenny's", style: "italic" },
  { name: "Vercel Ship", style: "mono" },
  { name: "Y Combinator", style: "display" },
  { name: "Stripe Sessions", style: "bold" },
  { name: "Designer News", style: "serif" }
] as const;

const handles2 = [
  { name: "FastCompany", style: "display" },
  { name: "The Verge", style: "bold" },
  { name: "Wired", style: "italic" },
  { name: "Maker's Almanac", style: "serif" },
  { name: "Console.fm", style: "mono" },
  { name: "Sidebar.io", style: "italic" },
  { name: "Refactoring", style: "display" },
  { name: "Page 1", style: "mono" },
  { name: "Newsletter Crew", style: "bold" },
  { name: "The Skim", style: "serif" }
] as const;

const pressQuotes = [
  {
    src: "Indie Hackers",
    quote: "\u201CTeskel feels like the obvious next step after Linktree.\u201D"
  },
  {
    src: "Product Hunt",
    quote: "\u201CThe first identity layer that actually sells software, not links.\u201D"
  },
  {
    src: "Console.fm",
    quote: "\u201CA creator OS with an AI twin baked in. Beautifully done.\u201D"
  }
];

type HandleStyle = "italic" | "mono" | "bold" | "display" | "serif";

function styleClass(s: HandleStyle) {
  switch (s) {
    case "mono":
      return "font-mono tracking-tight";
    case "bold":
      return "font-display font-bold tracking-tight";
    case "italic":
      return "font-display italic tracking-tight";
    case "serif":
      return "font-display tracking-tight";
    case "display":
    default:
      return "font-display font-medium tracking-tight";
  }
}

export function LogoCloud() {
  const row1 = [...handles, ...handles];
  const row2 = [...handles2, ...handles2];
  return (
    <section className="relative border-y border-border/50 bg-background">
      <div className="container py-12 md:py-16">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="inline-flex h-px w-10 bg-gradient-to-r from-transparent to-border" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            As featured in &amp; loved by
          </p>
          <span className="inline-flex h-px w-10 bg-gradient-to-l from-transparent to-border" />
        </div>

        <div className="pause-on-hover relative overflow-hidden mask-edges-x">
          <div className="marquee flex w-max items-center gap-16 whitespace-nowrap">
            {row1.map((h, i) => (
              <span
                key={`r1-${h.name}-${i}`}
                className={`text-[20px] text-muted-foreground/60 transition-colors duration-300 hover:text-foreground ${styleClass(
                  h.style
                )}`}
              >
                {h.name}
              </span>
            ))}
          </div>
        </div>

        <div className="pause-on-hover relative mt-5 overflow-hidden mask-edges-x">
          <div className="marquee-reverse flex w-max items-center gap-16 whitespace-nowrap">
            {row2.map((h, i) => (
              <span
                key={`r2-${h.name}-${i}`}
                className={`text-[17px] text-muted-foreground/40 transition-colors duration-300 hover:text-foreground ${styleClass(
                  h.style
                )}`}
              >
                {h.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {pressQuotes.map((q) => (
            <figure
              key={q.src}
              className="group rounded-xl border border-border/50 bg-card/50 px-5 py-4 transition-all duration-300 card-hover hover:border-border"
            >
              <blockquote className="font-display text-[14px] leading-snug text-foreground/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex h-px w-3 bg-border" />
                {q.src}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
