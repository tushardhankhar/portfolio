"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";

const SESSION_KEY = "td_intro_seen";
const EASE_LUXE = [0.16, 1, 0.3, 1] as const;

type Lenis = { stop: () => void; start: () => void };
const getLenis = () =>
  (window as unknown as { lenis?: Lenis }).lenis;

/**
 * First-load intro curtain. Shows the TD monogram drawing on, then slides
 * up to reveal the page. Plays once per browser session and is skipped for
 * users who prefer reduced motion. Lives outside the route `template` so its
 * fixed positioning isn't affected by the page-transition wrapper.
 */
export default function PageIntro() {
  const [show, setShow] = useState(true);

  // Decide whether to play, and drive the exit timing.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const seen = sessionStorage.getItem(SESSION_KEY);

    if (prefersReduced || seen) {
      setShow(false);
      return;
    }

    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";

    const t = setTimeout(() => setShow(false), 1450);
    return () => clearTimeout(t);
  }, []);

  // Release scroll + remember we've played, once hidden.
  useEffect(() => {
    if (show) return;
    getLenis()?.start();
    document.documentElement.style.overflow = "";
    sessionStorage.setItem(SESSION_KEY, "1");
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="page-intro"
          className="fixed inset-0 z-[120] flex items-center justify-center"
          style={{ background: "var(--ink)" }}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: EASE_LUXE }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: EASE_LUXE }}
          >
            <Logo animate glow className="h-16 w-auto text-[#faf8f4]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
