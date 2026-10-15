"use client";

import { useEffect, useRef } from "react";

const points = [
  {
    label: "Invisible",
    text: "High-translucency film that leaves the watch’s character untouched.",
  },
  {
    label: "Self-healing",
    text: "Minor scuffs ease out; the surface stays clean under daily wear.",
  },
  {
    label: "Life-proof",
    text: "Resistant to abrasion, oils, seawater, and heat — for watches that leave the safe.",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function span(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start), 0, 1);
}

function ease(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function arrive(el: HTMLElement) {
  const top = el.getBoundingClientRect().top;
  return ease(clamp(1 - top / (window.innerHeight * 0.9), 0, 1));
}

export function FilmSection() {
  const track = useRef<HTMLElement>(null);
  const cut = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const pointEls = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = track.current;
    if (!root) return;

    const apply = (progress: number) => {
      const scale = reduce ? 1 : 1.045 - ease(progress) * 0.045;
      if (cut.current) cut.current.style.transform = `scale(${scale})`;
      if (veil.current) {
        const veilOpacity = reduce
          ? 0
          : Math.max(1 - arrive(root), ease(span(progress, 0.82, 1)));
        veil.current.style.opacity = String(veilOpacity);
      }

      pointEls.current.forEach((node, index) => {
        if (!node) return;
        const shown = reduce ? 1 : ease(span(progress, 0.12 + index * 0.12, 0.42 + index * 0.12));
        node.style.opacity = String(shown);
        node.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
      });
    };

    if (reduce) {
      apply(1);
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = root.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const progress = distance <= 0 ? 0 : clamp(-rect.top / distance, 0, 1);
      apply(progress);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="protect" ref={track} className="film-track relative bg-bg">
      <div className="film-sticky sticky top-0 h-[100svh] overflow-hidden">
        <div
          ref={cut}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "scale(1.045)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/film-cut.jpg"
            alt="Precision-cut watch film"
            className="h-full w-full object-cover object-[center_42%]"
          />
        </div>
        <div
          ref={veil}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-black"
          style={{ opacity: 1 }}
        />
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-14 text-[#141414] md:px-10 md:pb-20">
            <p className="text-[11px] font-medium tracking-[0.22em] text-[#141414]/60 uppercase">
              The film
            </p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Built to disappear. Meant to endure.
            </h2>
            <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-12">
              {points.map((point, index) => (
                <div
                  key={point.label}
                  ref={(node) => {
                    pointEls.current[index] = node;
                  }}
                  className="will-change-transform"
                  style={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }}
                >
                  <h3 className="font-display text-[18px] font-medium tracking-[-0.01em]">
                    {point.label}
                  </h3>
                  <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-[#141414]/60">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
