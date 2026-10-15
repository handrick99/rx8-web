"use client";

import { useRef } from "react";
import {
  arriveProgress,
  ease,
  pinnedProgress,
  span,
  useScrollFrame,
} from "@/lib/scrollFrame";

export function Installation({
  brands,
  models,
}: {
  brands: number;
  models: number;
}) {
  const track = useRef<HTMLElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const factEls = useRef<Array<HTMLElement | null>>([]);
  const facts = [
    { value: String(brands), label: "Brands" },
    { value: String(models), label: "Models" },
  ];

  useScrollFrame((reduced) => {
    const root = track.current;
    if (!root || !veil.current) return;
    const progress = reduced ? 1 : pinnedProgress(root);
    const veilOpacity = reduced
      ? 0
      : Math.max(1 - arriveProgress(root), ease(span(progress, 0.78, 1)));
    veil.current.style.opacity = String(veilOpacity);

    factEls.current.forEach((node, index) => {
      if (!node) return;
      const shown = reduced
        ? 1
        : ease(span(progress, 0.04 + index * 0.1, 0.28 + index * 0.1));
      node.style.opacity = String(shown);
      node.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
    });
  });

  return (
    <section
      id="fitting"
      ref={track}
      className="install-track relative bg-bg text-white"
    >
      <div className="scroll-sticky sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/installation-hands.jpg"
            alt="Fitting protection film onto a watch"
            className="absolute inset-0 h-full w-full object-cover object-[center_42%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          />
        </div>
        <div
          ref={veil}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{ opacity: 1 }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-6 py-16 md:px-10">
          <div className="w-full max-w-[34rem]">
            <p className="text-[11px] font-medium tracking-[0.22em] text-white/70 uppercase">
              Installation
            </p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Fitted like the watch was made.
            </h2>
            <div className="mt-10 flex gap-12">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  ref={(node) => {
                    factEls.current[index] = node;
                  }}
                  className="will-change-transform"
                  style={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
                >
                  <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">
                    {fact.value}
                  </p>
                  <p className="mt-3 text-[11px] tracking-[0.18em] text-white/70 uppercase">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#request"
              ref={(node) => {
                factEls.current[2] = node;
              }}
              className="mt-10 inline-block text-[15px] text-white underline decoration-white/35 underline-offset-4 will-change-transform hover:decoration-white"
              style={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
            >
              Tailor film for any model
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
