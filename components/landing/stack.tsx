import { Reveal } from "@/components/site/reveal";

const stack = [
  ["Frontend", ["Next.js", "React", "Tailwind", "shadcn/ui", "Framer Motion"]],
  ["Backend", ["Node.js", "FastAPI", "Express", "Prisma"]],
  ["Database", ["PostgreSQL", "Redis", "Qdrant"]],
  ["AI", ["OpenAI", "Anthropic", "Gemini", "LiteLLM", "Mem0"]],
  ["Commerce", ["Stripe", "Lemon Squeezy", "Polar", "MedusaJS"]],
  ["Runtime", ["Docker", "Dokploy", "MinIO", "n8n", "Meilisearch"]]
] as const;

export function Stack() {
  return (
    <section className="container py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Modern stack
        </p>
        <h2 className="mt-4 font-display text-[32px] font-semibold tracking-[-0.025em] text-gradient sm:text-[44px]">
          Built on tools you already trust.
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          A fully self-hostable, AI-native stack. Use our cloud — or run Teskel on
          your own infra.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map(([title, items]) => (
          <Reveal
            key={title}
            className="group rounded-2xl border border-border/50 bg-card/50 p-5 transition-all duration-300 card-hover"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {title}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-lg border border-border/50 bg-background px-2.5 py-1 text-[12px] font-medium text-foreground transition-colors hover:border-foreground/20"
                >
                  {i}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
