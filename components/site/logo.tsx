import Link from "next/link";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  showWordmark = true
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Teskel home"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-base font-semibold tracking-tight",
        className
      )}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-sm ring-1 ring-black/5">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_55%)] opacity-80" />
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="relative h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 5h14" />
          <path d="M12 5v14" />
          <path d="M7.5 12c2.5 1.6 6.5 1.6 9 0" />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-foreground">
          Teskel<span className="text-violet-600">.</span>
        </span>
      )}
    </Link>
  );
}
