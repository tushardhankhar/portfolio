"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { MessageCircle, X, ArrowUp, Square } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { OPEN_CHAT_EVENT } from "@/lib/chat-events";

const SUGGESTIONS = [
  "What's Tushar's experience with AI?",
  "Walk me through his best projects.",
  "What's his tech stack?",
  "How can I get in touch?",
];

const textOf = (m: UIMessage) =>
  m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("")
    .trim();

export default function ChatWidget({ name = "Tushar" }: { name?: string }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const busy = status === "submitted" || status === "streaming";
  const firstName = name.split(" ")[0];

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, status]);

  // Open from external triggers (e.g. the navbar "Ask AI" button).
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  // Focus the input when the panel opens; Esc closes it.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : `Chat with ${firstName}'s assistant`}
        aria-expanded={open}
        className={cn(
          "fixed bottom-6 right-6 z-[90] grid place-items-center rounded-full cursor-pointer",
          "h-14 w-14 transition-all duration-500",
          "shadow-[0_10px_40px_-10px_rgba(134,71,151,0.6)]",
        )}
        style={{
          background:
            "linear-gradient(145deg, var(--purple), color-mix(in srgb, var(--purple) 55%, var(--parrot-blue)))",
          color: "#fff",
          transitionTimingFunction: "var(--ease-luxe)",
        }}
      >
        <span className="relative block h-6 w-6">
          <MessageCircle
            size={24}
            className={cn(
              "absolute inset-0 transition-all duration-300",
              open ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100",
            )}
          />
          <X
            size={24}
            className={cn(
              "absolute inset-0 transition-all duration-300",
              open ? "scale-100 opacity-100" : "scale-0 opacity-0 -rotate-90",
            )}
          />
        </span>
      </button>

      {/* Panel */}
      <div
        role="dialog"
        aria-label={`Assistant for ${name}`}
        className={cn(
          "fixed bottom-24 right-6 z-[90] flex flex-col overflow-hidden",
          "w-[min(92vw,390px)] h-[min(70vh,560px)] rounded-2xl origin-bottom-right",
          "border border-[color:var(--line-strong)]",
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-3 scale-95 pointer-events-none",
        )}
        style={{
          background: "rgba(10,11,15,0.86)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          transition: "all 0.45s var(--ease-luxe)",
          boxShadow: "0 24px 70px -20px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[color:var(--line)]">
          <span
            className="grid place-items-center h-9 w-9 rounded-lg shrink-0"
            style={{ background: "var(--navy)" }}
          >
            <Logo className="h-5 w-auto text-white" />
          </span>
          <div className="min-w-0">
            <p
              className="text-[#faf8f4] text-sm leading-tight"
              style={{ fontFamily: "var(--font-poppins)", fontWeight: 600 }}
            >
              Ask about {firstName}
            </p>
            <p className="text-[11px] text-faint leading-tight">
              AI assistant · answers may be imperfect
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="ml-auto p-1.5 rounded-md text-muted-luxe hover:text-[#faf8f4] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-sm"
        >
          {messages.length === 0 && (
            <div className="space-y-4">
              <p className="text-soft leading-relaxed">
                Hi! I&apos;m {firstName}&apos;s assistant. Ask me about his
                experience, projects, skills, or how to reach him.
              </p>
              <div className="flex flex-col gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-[13px] px-3 py-2 rounded-lg border border-[color:var(--line)] text-muted-luxe hover:text-[#faf8f4] hover:border-[color:var(--line-gold)] transition-colors cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={cn("flex", isUser ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap break-words leading-relaxed",
                    isUser
                      ? "rounded-br-md text-[#0c0a07]"
                      : "rounded-bl-md text-soft border border-[color:var(--line)]",
                  )}
                  style={
                    isUser
                      ? { background: "#f4f1ea" }
                      : { background: "rgba(255,255,255,0.035)" }
                  }
                >
                  {textOf(m) || (
                    <span className="text-faint italic">…</span>
                  )}
                </div>
              </div>
            );
          })}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="px-3.5 py-3 rounded-2xl rounded-bl-md border border-[color:var(--line)] bg-[rgba(255,255,255,0.035)]">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--soft-purple)] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-[13px] text-[var(--soft-purple)] text-center">
              Something went wrong. Try again, or email{" "}
              <span className="text-[#faf8f4]">directly</span>.
            </p>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 border-t border-[color:var(--line)] flex items-end gap-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder={`Ask about ${firstName}…`}
            className="flex-1 resize-none max-h-28 bg-transparent text-[#faf8f4] placeholder:text-faint text-sm leading-relaxed outline-none px-2 py-2"
            style={{ fontFamily: "var(--font-raleway)" }}
          />
          {busy ? (
            <button
              type="button"
              onClick={() => stop()}
              aria-label="Stop generating"
              className="grid place-items-center h-9 w-9 rounded-lg shrink-0 cursor-pointer text-[#faf8f4] border border-[color:var(--line-strong)] hover:border-[color:var(--line-gold)] transition-colors"
            >
              <Square size={15} className="fill-current" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="grid place-items-center h-9 w-9 rounded-lg shrink-0 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--gold)", color: "#1a1205" }}
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          )}
        </form>
      </div>
    </>
  );
}
