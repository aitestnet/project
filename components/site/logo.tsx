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
        "group inline-flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight",
        className
      )}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-foreground text-background ring-1 ring-black/5">
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="h-3.5 w-3.5"
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
          Teskel<span className="text-muted-foreground">.</span>
        </span>
      )}
    </Link>
  );
}
