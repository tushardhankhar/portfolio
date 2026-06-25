import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { buildSystemPrompt } from "@/lib/chat-context";

// Streaming can run a little long; give the function headroom.
export const maxDuration = 30;

/**
 * Google Gemini (free tier via Google AI Studio). The provider reads
 * GOOGLE_GENERATIVE_AI_API_KEY from the environment. Default is gemini-2.0-flash
 * for its more generous free-tier request limits; gemini-2.5-flash is higher
 * quality but rate-limits sooner on the free tier. Override via CHAT_MODEL.
 * Switching providers is a one-line change (e.g. `anthropic(...)` instead of
 * `google(...)`) thanks to the Vercel AI SDK.
 */
const CHAT_MODEL = process.env.CHAT_MODEL || "gemini-2.0-flash";

// Best-effort, per-instance rate limit. Resets on cold start and isn't shared
// across serverless instances — good enough to blunt casual abuse. Swap for
// @upstash/redis if you need a durable, distributed limit.
const WINDOW_MS = 5 * 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (
    fwd?.split(",")[0]?.trim() ||
    req.headers.get("x-nf-client-connection-ip") ||
    "anonymous"
  );
}

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: "The chat assistant isn't configured yet." },
      { status: 503 },
    );
  }

  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: "Too many messages — give it a minute and try again." },
      { status: 429 },
    );
  }

  let messages: UIMessage[];
  try {
    ({ messages } = await req.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // Bound cost: only keep the most recent turns.
  const recent = messages.slice(-12);
  const system = await buildSystemPrompt();

  const result = streamText({
    model: google(CHAT_MODEL),
    system,
    messages: await convertToModelMessages(recent),
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse({
    // Log the real error server-side for debugging, but never leak internal
    // error details to the client.
    onError: (error) => {
      console.error("[chat] stream error:", error);
      return "I'm getting a lot of questions right now — please try again in a moment.";
    },
  });
}
