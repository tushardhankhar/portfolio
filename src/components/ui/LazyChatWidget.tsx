"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { OPEN_CHAT_EVENT } from "@/lib/chat-events";

const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"), {
  ssr: false,
});

/**
 * Defers the chat widget (and its markdown/AI deps) out of the critical path.
 * Mounts on first idle moment, first scroll/pointer input, or immediately when
 * an "Ask AI" trigger fires. A pre-mount open request is preserved by the
 * pending flag in chat-events and honored by ChatWidget on mount.
 */
export default function LazyChatWidget({ name }: { name: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    const mount = () => setMounted(true);

    // Mount when the browser is idle (fallback: 3s), or on first interaction.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idleId = hasIdle
      ? window.requestIdleCallback(mount, { timeout: 3000 })
      : window.setTimeout(mount, 3000);

    window.addEventListener(OPEN_CHAT_EVENT, mount);
    window.addEventListener("scroll", mount, { once: true, passive: true });
    window.addEventListener("pointerdown", mount, { once: true, passive: true });

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      window.removeEventListener(OPEN_CHAT_EVENT, mount);
      window.removeEventListener("scroll", mount);
      window.removeEventListener("pointerdown", mount);
    };
  }, [mounted]);

  if (!mounted) return null;
  return <ChatWidget name={name} />;
}
