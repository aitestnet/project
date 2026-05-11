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
    <section className="container mt-20 md:mt-28">
      <div className="grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border bg-card md:grid-cols-4 md:divide-y-0">
        {items.map((s) => (
          <div key={s.label} className="p-6 md:p-8">
            <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {s.value}
              <span className="text-muted-foreground">{s.suffix}</span>
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
