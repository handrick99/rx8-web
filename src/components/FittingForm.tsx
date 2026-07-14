"use client";

import { FormEvent, useState } from "react";

type Prefill = {
  brand?: string;
  model?: string;
};

export function FittingForm({ prefill }: { prefill?: Prefill }) {
  const [sent, setSent] = useState(false);
  const watchValue =
    prefill?.brand && prefill?.model
      ? `${prefill.brand} ${prefill.model}`
      : prefill?.brand || "";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="request" className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <div className="md:col-span-5">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Request
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Request a cut.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-ink-muted">
            Tell us the watch. We’ll confirm fit, timing, and next steps.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <p className="border-t border-line pt-8 text-[17px] tracking-[-0.01em]">
              We’ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <label className="block">
                <span className="sr-only">Name</span>
                <input
                  className="field"
                  name="name"
                  required
                  placeholder="Name"
                  autoComplete="name"
                />
              </label>
              <label className="block">
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
              <label className="block">
                <span className="sr-only">Phone</span>
                <input
                  className="field"
                  name="phone"
                  type="tel"
                  placeholder="Phone (optional)"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
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
              <label className="block">
                <span className="sr-only">Message</span>
                <textarea
                  className="field min-h-[6rem] resize-y"
                  name="message"
                  placeholder="Message (optional)"
                />
              </label>

              <div className="pt-8">
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
