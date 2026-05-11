"use client";

const handles = [
  "yogi.ai",
  "aria.ai",
  "lumen.studio",
  "kenji.ai",
  "noor.ai",
  "ravi.ai",
  "lina.ai",
  "atelier.ai",
  "modular.dev",
  "halo.studio",
  "vega.ai",
  "indra.ai"
];

export function LogoCloud() {
  const row = [...handles, ...handles];
  return (
    <section className="border-y bg-card/40">
      <div className="container py-10 md:py-14">
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="inline-flex h-px w-8 bg-border" />
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Trusted by creators on the open web
          </p>
          <span className="inline-flex h-px w-8 bg-border" />
        </div>
        <div className="pause-on-hover relative overflow-hidden mask-edges-x">
          <div className="marquee flex w-max items-center gap-12 whitespace-nowrap">
            {row.map((h, i) => (
              <div
                key={`${h}-${i}`}
                className="flex items-center gap-2 font-mono text-[15px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-border" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
