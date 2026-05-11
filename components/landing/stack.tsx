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
    <section className="container mt-24 md:mt-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Modern stack
        </p>
        <h2 className="mt-3 font-display text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]">
          Built on tools you already trust.
        </h2>
        <p className="mt-4 text-[15px] text-muted-foreground">
          A fully self-hostable, AI-native stack. Use our cloud — or run Teskel on
          your own infra.
        </p>
      </div>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map(([title, items]) => (
          <div
            key={title}
            className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-card"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {title}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {items.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md border bg-background px-2 py-1 text-xs font-medium text-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
