"use client";

import { useEffect, useState } from "react";

const ASSETS = [
  "/video/hero.mp4",
  "/images/coverage-bezel.jpg",
  "/images/coverage-bracelet.jpg",
  "/images/coverage-clasp.jpg",
  "/images/installation-hands.jpg",
] as const;

const MIN_MS = 1400;
const MAX_MS = 10000;

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function loadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement("video");
    video.muted = true;
    video.preload = "auto";
    video.playsInline = true;

    const finish = () => {
      video.removeAttribute("src");
      video.load();
      resolve();
    };

    video.addEventListener("canplaythrough", finish, { once: true });
    video.addEventListener("error", finish, { once: true });
    video.src = src;
    video.load();
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

    document.documentElement.classList.remove("is-ready");
    document.documentElement.classList.add("is-loading");

    const mark = () => {
      loaded += 1;
      setProgress(loaded / ASSETS.length);
    };

    const reveal = () => {
      if (settled) return;
      settled = true;
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("is-ready");
      setProgress(1);
      setLeaving(true);
      window.setTimeout(
        () => setGone(true),
        reduce ? 120 : 900,
      );
    };

    const waitMin = async () => {
      const elapsed = performance.now() - started;
      const remain = Math.max(0, (reduce ? 200 : MIN_MS) - elapsed);
      if (remain) await new Promise((r) => window.setTimeout(r, remain));
    };

    const run = async () => {
      const jobs = ASSETS.map((src) =>
        (src.endsWith(".mp4") ? loadVideo(src) : loadImage(src)).then(mark),
      );

      await Promise.race([
        Promise.all(jobs).then(waitMin),
        new Promise<void>((r) => window.setTimeout(r, reduce ? 400 : MAX_MS)),
      ]);
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
