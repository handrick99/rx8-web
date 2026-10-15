"use client";

import { useEffect, useRef, useState } from "react";
import {
  clamp,
  ease,
  motionReduced,
  pinnedProgress,
  span,
} from "@/lib/scrollFrame";

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

function FilmCopy({ animated = false }: { animated?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-14 text-[#141414] md:px-10 md:pb-20">
      <p className="text-[11px] font-medium tracking-[0.22em] text-[#141414]/60 uppercase">
        The film
      </p>
      <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        Built to disappear. Meant to endure.
      </h2>
      <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-12">
        {points.map((point) => (
          <div
            key={point.label}
            data-film-point={animated ? "" : undefined}
            className={animated ? "will-change-transform" : undefined}
            style={
              animated
                ? { opacity: 0, transform: "translate3d(0, 12px, 0)" }
                : undefined
            }
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
  );
}

export function FilmSection() {
  const track = useRef<HTMLElement>(null);
  const cut = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const [lite, setLite] = useState(true);

  useEffect(() => {
    const sync = () => setLite(motionReduced());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (lite) return;
    const root = track.current;
    if (!root) return;

    const pointsEls = () =>
      [...root.querySelectorAll<HTMLElement>("[data-film-point]")];

    const apply = (progress: number) => {
      const scale = 1.045 - ease(progress) * 0.045;
      if (cut.current) cut.current.style.transform = `scale(${scale})`;
      if (veil.current) {
        const top = root.getBoundingClientRect().top;
        const arrive = ease(clamp(1 - top / (window.innerHeight * 0.9), 0, 1));
        veil.current.style.opacity = String(
          Math.max(1 - arrive, ease(span(progress, 0.82, 1))),
        );
      }
      pointsEls().forEach((node, index) => {
        const shown = ease(span(progress, 0.12 + index * 0.12, 0.42 + index * 0.12));
        node.style.opacity = String(shown);
        node.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
      });
    };

    let frame = 0;
    const update = () => apply(pinnedProgress(root));
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
  }, [lite]);

  if (lite) {
    return (
      <section id="protect" className="relative min-h-[100svh] overflow-hidden bg-bg">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/film-cut.jpg"
            alt="Precision-cut watch film"
            className="h-full w-full object-cover object-[center_42%]"
          />
        </div>
        <div className="relative z-10 flex min-h-[100svh] items-end">
          <FilmCopy />
        </div>
      </section>
    );
  }

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
          <FilmCopy animated />
        </div>
      </div>
    </section>
  );
}
