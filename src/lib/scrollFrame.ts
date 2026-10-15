import { useEffect, useRef } from "react";

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function span(progress: number, start: number, end: number) {
  return clamp((progress - start) / (end - start), 0, 1);
}

/** Long, even curve so motion eases in and out without a bump. */
export function ease(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function pinnedProgress(el: HTMLElement) {
  const distance = el.offsetHeight - window.innerHeight;
  if (distance <= 0) return 1;
  return clamp(-el.getBoundingClientRect().top / distance, 0, 1);
}

/** How far a single element has risen into view. */
export function enterProgress(el: HTMLElement, lead = 0) {
  const start = window.innerHeight * 1.08 - lead;
  return ease(
    clamp((start - el.getBoundingClientRect().top) / (window.innerHeight * 0.85), 0, 1),
  );
}

/** 0 while a section is still below the fold, 1 once it has settled at the top. */
export function arriveProgress(el: HTMLElement) {
  const top = el.getBoundingClientRect().top;
  return ease(clamp(1 - top / (window.innerHeight * 0.9), 0, 1));
}

/** Phones and reduced-motion: skip scroll-linked animation. */
export function motionReduced() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 767px)").matches
  );
}

export function useScrollFrame(run: (reduced: boolean) => void) {
  const runRef = useRef(run);
  runRef.current = run;

  useEffect(() => {
    const tick = () => runRef.current(motionReduced());
    tick();

    let frame = 0;
    const onScroll = () => {
      if (motionReduced()) {
        tick();
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
