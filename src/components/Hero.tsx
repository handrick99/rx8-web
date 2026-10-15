"use client";

import { useEffect, useRef, useState } from "react";
import {
  ease,
  enterProgress,
  pinnedProgress,
  span,
  useScrollFrame,
  type MotionMode,
} from "@/lib/scrollFrame";

function heroSource() {
  if (typeof window === "undefined") return "/video/hero.mp4";
  const narrow = window.matchMedia("(max-width: 900px)").matches;
  const saveData =
    "connection" in navigator &&
    Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  return narrow || saveData ? "/video/hero-mobile.mp4" : "/video/hero.mp4";
}

export function Hero() {
  const track = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(heroSource());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      const play = video.play();
      if (play) play.catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, [src]);

  useScrollFrame((mode: MotionMode) => {
    const root = track.current;
    if (!root || !plane.current || !copy.current || !veil.current) return;

    if (mode === "off") {
      plane.current.style.transform = "none";
      veil.current.style.opacity = "0";
      copy.current.style.opacity = "1";
      copy.current.style.transform = "none";
      return;
    }

    if (mode === "lite") {
      plane.current.style.transform = "none";
      veil.current.style.opacity = "0";
      const shown = enterProgress(copy.current);
      copy.current.style.opacity = String(shown);
      copy.current.style.transform = `translate3d(0, ${(1 - shown) * 12}px, 0)`;
      return;
    }

    const progress = pinnedProgress(root);
    const scale = 1 + ease(progress) * 0.035;
    const fade = 1 - ease(span(progress, 0.28, 0.78));
    plane.current.style.transform = `scale(${scale})`;
    veil.current.style.opacity = String(ease(span(progress, 0.5, 1)));
    copy.current.style.opacity = String(fade);
    copy.current.style.transform = `translate3d(0, ${ease(progress) * -18}px, 0)`;
  });

  return (
    <section id="top" ref={track} className="relative bg-bg md:hero-track">
      <div className="relative min-h-[100svh] overflow-hidden md:scroll-sticky md:sticky md:top-0 md:h-[100svh]">
      {/* Full-bleed video plane */}
      <div ref={plane} className="absolute inset-0 will-change-transform">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {src ? (
          <video
            key={src}
            ref={videoRef}
            className="hero-video absolute inset-0 h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/hero-poster.jpg"
            controls={false}
            disablePictureInPicture
            src={src}
            aria-label="RX8 Studio watch protection film"
          />
        ) : null}
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
      <div
        ref={veil}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] hidden bg-black md:block"
        style={{ opacity: 0 }}
      />

      {/* Floating copy */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pt-28 pb-[max(4rem,env(safe-area-inset-bottom))] md:h-full md:justify-center md:px-10 md:pb-24 md:pt-20">
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
