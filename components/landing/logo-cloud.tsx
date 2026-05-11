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

function styleClass(s: (typeof handles)[number]["style"]) {
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
  const row = [...handles, ...handles];
  return (
    <section className="border-y bg-card/40">
      <div className="container py-10 md:py-14">
        <div className="mb-7 flex items-center justify-center gap-3">
          <span className="inline-flex h-px w-8 bg-border" />
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            As seen in & loved by indie + maker communities
          </p>
          <span className="inline-flex h-px w-8 bg-border" />
        </div>
        <div className="pause-on-hover relative overflow-hidden mask-edges-x">
          <div className="marquee flex w-max items-center gap-14 whitespace-nowrap">
            {row.map((h, i) => (
              <span
                key={`${h.name}-${i}`}
                className={`text-[19px] text-muted-foreground transition-colors hover:text-foreground ${styleClass(h.style)}`}
              >
                {h.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
