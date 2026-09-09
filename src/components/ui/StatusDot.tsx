import { cn } from "@/lib/utils";

interface StatusDotProps {
  /** dot diameter in px (default 8) */
  size?: number;
  className?: string;
}

/**
 * The single "I'm available" indicator used across the site — a solid green
 * core with an expanding halo. Green is reserved for this one meaning; every
 * other accent dot on the page stays gold.
 */
export default function StatusDot({ size = 8, className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn("status-dot", className)}
      style={{ ["--dot-size" as string]: `${size}px` }}
    >
      <span className="status-dot__halo" />
      <span className="status-dot__core" />
    </span>
  );
}
