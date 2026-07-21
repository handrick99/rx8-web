"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Full-bleed video plane */}
      <div className="absolute inset-0">
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

      {/* Floating copy */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-10 md:pb-24 md:pt-20">
        <div className="mx-auto w-full max-w-[1400px]">
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
              href="#browse"
              className="inline-flex items-center bg-white px-7 py-3.5 text-[13px] tracking-[0.08em] text-ink transition-opacity hover:opacity-90"
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
    </section>
  );
}
