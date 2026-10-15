"use client";

import { useEffect, useState } from "react";

const IMAGE_ASSETS = [
  "/images/hero-poster.jpg",
  "/images/coverage-bezel.jpg",
  "/images/coverage-bracelet.jpg",
  "/images/coverage-clasp.jpg",
  "/images/installation-hands.jpg",
] as const;

const MIN_MS = 900;
const MAX_MS = 16000;

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function isHeroPlaying(video: HTMLVideoElement) {
  return !video.paused && video.readyState >= 2 && video.currentTime > 0.05;
}

function waitForHeroPlaying(timeoutMs: number) {
  return new Promise<void>((resolve) => {
    let finished = false;
    let attached: HTMLVideoElement | null = null;

    const done = () => {
      if (finished) return;
      finished = true;
      window.clearInterval(poll);
      window.clearTimeout(limit);
      if (attached) attached.removeEventListener("playing", onPlaying);
      resolve();
    };

    const onPlaying = () => done();

    const nudge = (video: HTMLVideoElement) => {
      if (attached !== video) {
        if (attached) attached.removeEventListener("playing", onPlaying);
        attached = video;
        video.addEventListener("playing", onPlaying);
      }
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      const play = video.play();
      if (play) play.catch(() => {});
      if (isHeroPlaying(video)) done();
    };

    const poll = window.setInterval(() => {
      const video = document.querySelector<HTMLVideoElement>(".hero-video");
      if (video) nudge(video);
    }, 100);

    const limit = window.setTimeout(done, timeoutMs);
  });
}

export function SiteLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();
    let settled = false;
    let loaded = 0;
    const total = IMAGE_ASSETS.length + 1;

    document.documentElement.classList.remove("is-ready");
    document.documentElement.classList.add("is-loading");

    const mark = () => {
      loaded += 1;
      setProgress(Math.min(1, loaded / total));
    };

    const reveal = () => {
      if (settled) return;
      settled = true;
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("is-ready");
      setProgress(1);
      setLeaving(true);
      window.setTimeout(() => setGone(true), reduce ? 120 : 700);
    };

    const waitMin = async () => {
      const elapsed = performance.now() - started;
      const remain = Math.max(0, (reduce ? 120 : MIN_MS) - elapsed);
      if (remain) await new Promise((r) => window.setTimeout(r, remain));
    };

    const run = async () => {
      await Promise.all(IMAGE_ASSETS.map((src) => loadImage(src).then(mark)));

      if (reduce) {
        mark();
        await waitMin();
        reveal();
        return;
      }

      await waitForHeroPlaying(MAX_MS);
      mark();
      await waitMin();
      reveal();
    };

    run();

    return () => {
      document.documentElement.classList.remove("is-loading");
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`site-loader fixed inset-0 z-[100] flex items-center justify-center bg-black ${
        leaving ? "is-leaving" : ""
      }`}
      aria-hidden={leaving}
      aria-busy={!leaving}
      aria-label="Loading"
    >
      <div className="flex w-[min(16rem,70vw)] flex-col items-center">
        <p className="font-display text-[13px] font-semibold tracking-[0.32em] text-white">
          RX8 STUDIO
        </p>
        <div className="site-loader-track mt-10 h-px w-full overflow-hidden bg-white/15">
          <div
            className="site-loader-bar h-full bg-white"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>
      </div>
    </div>
  );
}
