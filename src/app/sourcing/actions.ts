"use server";

import { headers } from "next/headers";
import {
  sourcingMessage,
  sourcingWatch,
  sourcingWhatsappUrl,
  validateSourcing,
  type SourcingErrors,
  type SourcingInput,
} from "@/lib/sourcing";

export type SourcingResult =
  | { ok: true; whatsappUrl: string; emailed: boolean }
  | { ok: false; errors?: SourcingErrors; message?: string };

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits: Map<string, number[]> =
  (globalThis as { sourcingHits?: Map<string, number[]> }).sourcingHits ??
  new Map();
(globalThis as { sourcingHits?: Map<string, number[]> }).sourcingHits = hits;

function clientKey(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || "local";
}

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

async function sendEmail(input: SourcingInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SOURCING_TO_EMAIL;
  const from = process.env.SOURCING_FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const watch = sourcingWatch(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email.trim(),
      subject: `Sourcing inquiry: ${watch.brand} ${watch.model}`,
      text: sourcingMessage(input),
    }),
  });

  return response.ok;
}

export async function submitSourcingInquiry(
  input: SourcingInput,
): Promise<SourcingResult> {
  if (input.company.trim()) {
    return { ok: true, whatsappUrl: "", emailed: false };
  }

  const errors = validateSourcing(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const headerList = await headers();
  if (limited(clientKey(headerList))) {
    return {
      ok: false,
      message: "Too many inquiries from this connection. Please try again later.",
    };
  }

  let emailed = false;
  try {
    emailed = await sendEmail(input);
  } catch {
    emailed = false;
  }

  return {
    ok: true,
    whatsappUrl: sourcingWhatsappUrl(input),
    emailed,
  };
}
