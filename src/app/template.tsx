"use client";

import { motion } from "framer-motion";

/**
 * Cross-route transition. App Router remounts this on every navigation, so a
 * fade here gives a smooth enter for each route (e.g. → /studio, and future
 * blog / case-study pages).
 *
 * Note: only `opacity` is animated. A transform/filter on this wrapper would
 * create a containing block and re-anchor the page's `position: fixed`
 * elements (navbar, cursor, grain, scroll progress) — opacity does not.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
