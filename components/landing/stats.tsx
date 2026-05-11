"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate
} from "framer-motion";
import { Users, Package, Cpu, DollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { teskelStats } from "@/lib/data";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  Icon: LucideIcon;
  tint: string;
  text: string;
};

const items: Item[] = [
  {
    label: "AI creators",
    value: teskelStats.creators,
    suffix: "+",
    Icon: Users,
    tint: "bg-tint-indigo",
    text: "text-indigo-500"
  },
  {
    label: "Digital products",
    value: teskelStats.products,
    Icon: Package,
    tint: "bg-tint-violet",
    text: "text-violet-500"
  },
  {
    label: "Live runtimes",
    value: teskelStats.deployments,
    Icon: Cpu,
    tint: "bg-tint-emerald",
    text: "text-emerald-500"
  },
  {
    label: "Creator GMV",
    value: teskelStats.revenue,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    Icon: DollarSign,
    tint: "bg-tint-amber",
    text: "text-amber-500"
  }
];

function CountUp({
  to,
  decimals = 0,
  duration = 1.6
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
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
          "grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        )}
      >
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.55,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card md:p-6"
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-70 blur-2xl",
                s.tint
              )}
            />
            <div className="relative flex items-start justify-between">
              <p className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">
                {s.prefix}
                <CountUp to={s.value} decimals={s.decimals ?? 0} />
                <span className="text-muted-foreground">{s.suffix}</span>
              </p>
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                  s.text
                )}
              >
                <s.Icon className="h-3.5 w-3.5" />
              </span>
            </div>
            <p className="relative mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
