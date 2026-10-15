"use client";

import { useRef } from "react";
import {
  arriveProgress,
  ease,
  enterProgress,
  pinnedProgress,
  span,
  useScrollFrame,
  type MotionMode,
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

  useScrollFrame((mode: MotionMode) => {
    const root = track.current;
    if (!root) return;

    if (mode === "off") {
      if (veil.current) veil.current.style.opacity = "0";
      factEls.current.forEach((node) => {
        if (!node) return;
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    if (mode === "lite") {
      if (veil.current) veil.current.style.opacity = "0";
      factEls.current.forEach((node, index) => {
        if (!node) return;
        const shown = enterProgress(node, index * 24);
        node.style.opacity = String(shown);
        node.style.transform = `translate3d(0, ${(1 - shown) * 10}px, 0)`;
      });
      return;
    }

    if (!veil.current) return;
    const progress = pinnedProgress(root);
    veil.current.style.opacity = String(
      Math.max(1 - arriveProgress(root), ease(span(progress, 0.78, 1))),
    );

    factEls.current.forEach((node, index) => {
      if (!node) return;
      const shown = ease(span(progress, 0.04 + index * 0.1, 0.28 + index * 0.1));
      node.style.opacity = String(shown);
      node.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
    });
  });

  return (
    <section
      id="fitting"
      ref={track}
      className="relative bg-bg text-white md:install-track"
    >
      <div className="relative min-h-[100svh] overflow-hidden md:scroll-sticky md:sticky md:top-0 md:h-[100svh]">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/installation-hands.jpg"
            alt="Fitting protection film onto a watch"
            className="absolute inset-0 h-full w-full object-cover object-[center_28%] md:object-[center_42%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
          />
        </div>
        <div
          ref={veil}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 hidden bg-black md:block"
          style={{ opacity: 1 }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] items-end px-6 pt-24 pb-[max(2.5rem,env(safe-area-inset-bottom))] md:h-full md:items-end md:px-10 md:py-16">
          <div className="w-full max-w-[34rem]">
            <p className="text-[11px] font-medium tracking-[0.22em] text-white/70 uppercase">
              Installation
            </p>
            <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(1.85rem,7vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] md:mt-5">
              Fitted like the watch was made.
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 md:mt-10 md:flex md:gap-12">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  ref={(node) => {
                    factEls.current[index] = node;
                  }}
                  className="will-change-transform"
                  style={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
                >
                  <p className="font-display text-[clamp(2.25rem,10vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-[11px] tracking-[0.18em] text-white/70 uppercase md:mt-3">
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
              className="mt-8 inline-block text-[15px] text-white underline decoration-white/35 underline-offset-4 will-change-transform hover:decoration-white md:mt-10"
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
