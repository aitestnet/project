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
  caption: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  Icon: LucideIcon;
  tint: string;
  text: string;
  trend: string;
  spark: number[];
  stroke: string;
};

const items: Item[] = [
  {
    label: "AI creators",
    caption: "on the platform",
    value: teskelStats.creators,
    suffix: "+",
    Icon: Users,
    tint: "bg-tint-indigo",
    text: "text-indigo-500",
    trend: "+38% MoM",
    spark: [12, 14, 13, 18, 20, 19, 24, 28, 27, 33, 36, 41],
    stroke: "stroke-indigo-500"
  },
  {
    label: "Digital products",
    caption: "shipped to date",
    value: teskelStats.products,
    Icon: Package,
    tint: "bg-tint-violet",
    text: "text-violet-500",
    trend: "+22% MoM",
    spark: [20, 24, 23, 28, 31, 30, 36, 40, 44, 47, 52, 58],
    stroke: "stroke-violet-500"
  },
  {
    label: "Live runtimes",
    caption: "deployed via Dokploy",
    value: teskelStats.deployments,
    Icon: Cpu,
    tint: "bg-tint-emerald",
    text: "text-emerald-500",
    trend: "+45% MoM",
    spark: [8, 10, 12, 14, 18, 22, 26, 30, 36, 42, 50, 58],
    stroke: "stroke-emerald-500"
  },
  {
    label: "Creator GMV",
    caption: "processed since launch",
    value: teskelStats.revenue,
    prefix: "$",
    suffix: "M",
    decimals: 1,
    Icon: DollarSign,
    tint: "bg-tint-amber",
    text: "text-amber-500",
    trend: "+51% MoM",
    spark: [10, 12, 16, 18, 22, 26, 30, 36, 42, 48, 55, 62],
    stroke: "stroke-amber-500"
  }
];

function Sparkline({
  data,
  stroke
}: {
  data: number[];
  stroke: string;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const w = 120;
  const h = 36;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return { x, y };
  });
  const points = pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
  const areaPoints =
    `0,${h} ` + points + ` ${w},${h}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-9 w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <polygon
        points={areaPoints}
        className={cn(stroke, "fill-current opacity-10")}
      />
      <polyline
        points={points}
        className={cn(stroke, "fill-none")}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            By the numbers
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
            Growing fast, with creators in 42 countries.
          </h2>
        </div>
        <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:inline-flex">
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 text-emerald-500 pulse-dot" />
          Updated daily
        </span>
      </div>
      <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4")}>
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
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                  s.text
                )}
              >
                <s.Icon className="h-3.5 w-3.5" />
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  s.tint,
                  s.text
                )}
              >
                {s.trend}
              </span>
            </div>
            <p className="number-display relative mt-4 font-display text-[44px] font-semibold leading-none md:text-[56px]">
              {s.prefix}
              <CountUp to={s.value} decimals={s.decimals ?? 0} />
              <span className="text-muted-foreground">{s.suffix}</span>
            </p>
            <p className="relative mt-3 text-[12px] font-medium text-foreground">
              {s.label}
            </p>
            <p className="relative text-[11px] text-muted-foreground">
              {s.caption}
            </p>
            <div className="relative mt-3">
              <Sparkline data={s.spark} stroke={s.stroke} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
