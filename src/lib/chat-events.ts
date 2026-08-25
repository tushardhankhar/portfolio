/**
 * Decoupled trigger for the chat widget. Any client component can call
 * `openChat()` to open the "Ask about Tushar" panel without prop-drilling or a
 * shared provider — the ChatWidget listens for this event.
 *
 * The widget is lazily mounted, so an open request can fire before it exists.
 * `openChat()` records the request; the widget calls `consumePendingOpen()` on
 * mount to honor it — no lost clicks, no timing guesswork.
 */
export const OPEN_CHAT_EVENT = "td:open-chat";

let pendingOpen = false;

export function openChat() {
  if (typeof window !== "undefined") {
    pendingOpen = true;
    window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
  }
}

/** Returns true (once) if an open was requested before the widget mounted. */
export function consumePendingOpen(): boolean {
  const p = pendingOpen;
  pendingOpen = false;
  return p;
}
