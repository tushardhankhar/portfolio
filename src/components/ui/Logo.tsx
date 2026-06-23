"use client";

import { cn } from "@/lib/utils";

/**
 * TD monogram — Tushar Dhankhar.
 * A solid "T" (left arm + stem) whose stem is shared with the back of a "D",
 * the bowl carrying the signature diagonal chamfer at its top-right.
 *
 * Filled with `currentColor` so it adapts to light / dark contexts. When
 * `animate` is set, it wipes on left-to-right — the loader concept.
 */
export default function Logo({
  className,
  title = "Tushar Dhankhar",
  animate = false,
  glow = false,
}: {
  className?: string;
  title?: string;
  animate?: boolean;
  glow?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 108 96"
      role="img"
      aria-label={title}
      className={cn("td-logo", animate && "td-logo--animate", className)}
      style={
        glow
          ? { filter: "drop-shadow(0 0 6px color-mix(in srgb, currentColor 55%, transparent))" }
          : undefined
      }
    >
      {/* T: crossbar with diagonal slash terminal + stem */}
      <path fill="currentColor" d="M8 15 L48 15 L41 31 H33 V81 H17 V31 H8 Z" />
      {/* D: distinct bold bowl with counter punched out */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M50 15 L64 15 C86 15 100 32 100 48 C100 64 86 81 64 81 L50 81 Z M66 31 L66 65 C78 65 84 58 84 48 C84 38 78 31 66 31 Z"
      />
    </svg>
  );
}
