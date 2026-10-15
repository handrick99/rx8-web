"use client";

import { FormEvent, useRef, useState } from "react";
import {
  EMAIL,
  EMAIL_HREF,
  WHATSAPP_DISPLAY,
  WHATSAPP_HREF,
} from "@/data/contact";
import { enterProgress, useScrollFrame } from "@/lib/scrollFrame";

type Prefill = {
  brand?: string;
  model?: string;
};

export function FittingForm({ prefill }: { prefill?: Prefill }) {
  const [sent, setSent] = useState(false);
  const intro = useRef<HTMLDivElement>(null);
  const fields = useRef<Array<HTMLElement | null>>([]);
  const watchValue =
    prefill?.brand && prefill?.model
      ? `${prefill.brand} ${prefill.model}`
      : prefill?.brand || "";

  useScrollFrame((reduced) => {
    if (intro.current) {
      const shown = reduced ? 1 : enterProgress(intro.current);
      intro.current.style.opacity = String(shown);
      intro.current.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
    }
    fields.current.forEach((node, index) => {
      if (!node) return;
      const shown = reduced ? 1 : enterProgress(node, index * 16);
      node.style.opacity = String(shown);
      node.style.transform = `translate3d(0, ${(1 - shown) * 10}px, 0)`;
    });
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="request" className="screen-section bg-black">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-16 px-6 py-16 md:grid-cols-12 md:px-10">
        <div
          ref={intro}
          className="will-change-transform md:col-span-5"
          style={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
        >
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Request
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Book an appointment.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-ink-muted">
            Tell us the watch. We’ll confirm fit, timing, and next steps. Or
            message on{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>{" "}
            or{" "}
            <a
              href={EMAIL_HREF}
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              {EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <p className="border-t border-line pt-8 text-[17px] tracking-[-0.01em]">
              We’ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <label
                className="block will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[0] = node;
                }}
              >
                <span className="sr-only">Name</span>
                <input
                  className="field"
                  name="name"
                  required
                  placeholder="Name"
                  autoComplete="name"
                />
              </label>
              <label
                className="block will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[1] = node;
                }}
              >
                <span className="sr-only">Email</span>
                <input
                  className="field"
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                />
              </label>
              <label
                className="block will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[2] = node;
                }}
              >
                <span className="sr-only">Phone</span>
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  autoComplete="tel"
                />
              </label>
              <label
                className="block will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[3] = node;
                }}
              >
                <span className="sr-only">Watch</span>
                <input
                  key={watchValue}
                  className="field"
                  name="watch"
                  required
                  defaultValue={watchValue}
                  placeholder="Brand, model / reference"
                />
              </label>
              <label
                className="block will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[4] = node;
                }}
              >
                <span className="sr-only">Message</span>
                <textarea
                  className="field min-h-[6rem] resize-y"
                  name="message"
                  placeholder="Message (optional)"
                />
              </label>

              <div
                className="pt-8 will-change-transform"
                style={{ opacity: 0, transform: "translate3d(0, 10px, 0)" }}
                ref={(node) => {
                  fields.current[5] = node;
                }}
              >
                <button
                  type="submit"
                  className="inline-flex bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-85"
                >
                  Request a fitting
                </button>
                <p className="mt-4 text-[13px] text-ink-muted">
                  In-person installation available. Online purchase options
                  where listed.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
