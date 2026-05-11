"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

import { teskelStats } from "@/lib/data";
import { cn } from "@/lib/utils";

const items: { label: string; value: number; suffix?: string; prefix?: string; decimals?: number }[] = [
  { label: "AI creators", value: teskelStats.creators, suffix: "+" },
  { label: "Digital products", value: teskelStats.products },
  { label: "Live runtimes", value: teskelStats.deployments },
  { label: "Creator GMV", value: teskelStats.revenue, prefix: "$", suffix: "M", decimals: 1 }
];

function CountUp({ to, decimals = 0, duration = 1.6 }: { to: number; decimals?: number; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const formatted = useTransform(mv, (v) =>
    v.toLocaleString("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals
    })
  );

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, mv, to, duration]);

  return <motion.span ref={ref}>{formatted}</motion.span>;
}

export function Stats() {
  return (
    <section className="container mt-20 md:mt-28">
      <div
        className={cn(
          "grid grid-cols-2 divide-x divide-y divide-border overflow-hidden rounded-2xl border bg-card md:grid-cols-4 md:divide-y-0"
        )}
      >
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-6 md:p-8"
          >
            <p className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
              {s.prefix}
              <CountUp to={s.value} decimals={s.decimals ?? 0} />
              <span className="text-muted-foreground">{s.suffix}</span>
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {s.label}
            </p>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-foreground transition-transform duration-500 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
