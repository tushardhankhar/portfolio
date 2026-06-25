"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide ambient backdrop: a faint animated grid, drifting aurora orbs, and
 * a soft spotlight that follows the cursor. Fixed behind all content
 * (z-index -10), pointer-events none, and entirely GPU-friendly
 * (transform/opacity). The cursor spotlight is disabled for touch /
 * reduced-motion and throttled to one update per animation frame.
 */
export default function AmbientBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />

      {/* Drifting aurora orbs — brand hues, heavily blurred */}
      <div
        className="ambient-orb animate-aurora"
        style={{
          top: "-14%",
          right: "-6%",
          width: "52vw",
          height: "52vw",
          maxWidth: 760,
          maxHeight: 760,
          background:
            "radial-gradient(circle, rgba(134,71,151,0.55), transparent 66%)",
          opacity: 0.9,
        }}
      />
      <div
        className="ambient-orb"
        style={{
          bottom: "-20%",
          left: "-12%",
          width: "44vw",
          height: "44vw",
          maxWidth: 660,
          maxHeight: 660,
          background:
            "radial-gradient(circle, rgba(12,192,223,0.30), transparent 66%)",
          opacity: 0.75,
          animation: "auroraDrift2 26s ease-in-out infinite",
        }}
      />
      <div
        className="ambient-orb animate-float-y"
        style={{
          top: "34%",
          left: "40%",
          width: "30vw",
          height: "30vw",
          maxWidth: 460,
          maxHeight: 460,
          background:
            "radial-gradient(circle, rgba(177,144,193,0.28), transparent 64%)",
          opacity: 0.7,
        }}
      />

      <div ref={spotlightRef} className="ambient-spotlight" />
    </div>
  );
}
