import { formatCompactNumber } from "@/lib/utils";
import { teskelStats } from "@/lib/data";

const items = [
  { label: "AI creators", value: formatCompactNumber(teskelStats.creators), suffix: "+" },
  { label: "Digital products", value: formatCompactNumber(teskelStats.products), suffix: "" },
  { label: "Live runtimes", value: formatCompactNumber(teskelStats.deployments), suffix: "" },
  { label: "Creator GMV", value: `$${teskelStats.revenue.toFixed(1)}M`, suffix: "" }
];

export function Stats() {
  return (
    <section className="container mt-16 md:mt-24">
      <div className="rounded-2xl border bg-card/60 px-6 py-8 backdrop-blur">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {s.value}
                <span className="text-violet-600">{s.suffix}</span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
