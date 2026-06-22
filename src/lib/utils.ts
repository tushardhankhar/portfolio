import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS class names with clsx.
 * Handles conditional classes and deduplicates conflicting Tailwind utilities.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Formats a date range string.
 */
export function formatDateRange(start: string, end: string | null): string {
  return end ? `${start} – ${end}` : `${start} – Present`;
}

/**
 * Delays execution by ms milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Checks if the current environment is browser.
 */
export const isBrowser = typeof window !== "undefined";

/**
 * Truncates a string to maxLength and appends ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}
