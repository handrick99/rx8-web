"use client";

import { useEffect, useRef } from "react";
import { ease, pinnedProgress, span, useScrollFrame } from "@/lib/scrollFrame";

export function Hero() {
  const track = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = video.play();
    if (play) {
      play.catch(() => {
        // Autoplay blocked — muted loop still preferred on next gesture
      });
    }
  }, []);

  useScrollFrame((reduced) => {
    const root = track.current;
    if (!root || !plane.current || !copy.current || !veil.current) return;
    const progress = reduced ? 0 : pinnedProgress(root);
    const scale = 1 + ease(progress) * 0.035;
    const fade = 1 - ease(span(progress, 0.28, 0.78));
    plane.current.style.transform = `scale(${scale})`;
    veil.current.style.opacity = String(reduced ? 0 : ease(span(progress, 0.5, 1)));
    copy.current.style.opacity = String(fade);
    copy.current.style.transform = `translate3d(0, ${ease(progress) * -18}px, 0)`;
  });

  return (
    <section id="top" ref={track} className="hero-track relative bg-bg">
      <div className="scroll-sticky sticky top-0 h-[100svh] overflow-hidden">
      {/* Full-bleed video plane */}
      <div ref={plane} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="RX8 Studio watch protection film"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Soft veil so type stays readable — light gallery, not heavy blackout */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/55 via-[#1a1a1a]/20 to-[#1a1a1a]/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/40 via-transparent to-transparent"
        />
      </div>
      <div ref={veil} aria-hidden className="pointer-events-none absolute inset-0 z-[5] bg-black" style={{ opacity: 0 }} />

      {/* Floating copy */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-10 md:pb-24 md:pt-20">
        <div ref={copy} className="mx-auto w-full max-w-[1400px] will-change-transform">
          <p className="font-display animate-rise text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.03em] text-white">
            RX8
            <br />
            STUDIO
          </p>
          <h1 className="animate-rise delay-1 mt-8 max-w-[18ch] text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-snug tracking-[-0.02em] text-white">
            Invisible armor for watches built to last.
          </h1>
          <p className="animate-rise delay-2 mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/75">
            Tailor-cut protection film. Nearly undetectable. Fitted in person.
          </p>
          <div className="animate-rise delay-3 mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#request"
              className="inline-flex items-center bg-white px-7 py-3.5 text-[13px] tracking-[0.08em] text-[#0a0a0a] transition-opacity hover:opacity-90"
            >
              Protect your watch
            </a>
            <a
              href="#request"
              className="text-[13px] tracking-[0.04em] text-white/80 underline decoration-white/35 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Book a fitting
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
