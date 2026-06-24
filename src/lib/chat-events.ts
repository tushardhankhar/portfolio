/**
 * Decoupled trigger for the chat widget. Any client component can call
 * `openChat()` to open the "Ask about Tushar" panel without prop-drilling or a
 * shared provider — the ChatWidget listens for this event.
 */
export const OPEN_CHAT_EVENT = "td:open-chat";

export function openChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
  }
}
