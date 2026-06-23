"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  /** anchor target — when href is external */
  external?: boolean;
  /** magnetic pull strength in px (default 14) */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Button/link that subtly leans toward the cursor on hover (magnetic effect).
 * Used for primary CTAs to add a tactile, premium feel.
 */
export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  external,
  strength = 14,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: (x / rect.width) * strength * 2, y: (y / rect.height) * strength * 2 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.5 }}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn("btn", className)}
        >
          {inner}
        </a>
      ) : (
        <button onClick={onClick} aria-label={ariaLabel} className={cn("btn", className)}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
