"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { enterProgress, useScrollFrame } from "@/lib/scrollFrame";

const zones = [
  {
    id: "bezel",
    title: "Bezel",
    image: "/images/coverage-bezel.jpg",
    alt: "Close-up of a diamond bezel and crystal",
  },
  {
    id: "bracelet",
    title: "Bracelet",
    image: "/images/coverage-bracelet.jpg",
    alt: "Close-up of bracelet links",
  },
  {
    id: "clasp",
    title: "Clasp",
    image: "/images/coverage-clasp.jpg",
    alt: "Close-up of a watch clasp",
  },
];

export function ProtectionZones() {
  const figures = useRef<Array<HTMLElement | null>>([]);
  const medias = useRef<Array<HTMLDivElement | null>>([]);
  const [open, setOpen] = useState<(typeof zones)[number]["id"] | null>(null);
  const zone = zones.find((item) => item.id === open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useScrollFrame((reduced) => {
    figures.current.forEach((figure, index) => {
      const media = medias.current[index];
      if (!figure || !media) return;
      const shown = reduced ? 1 : enterProgress(figure, index * 56);
      figure.style.opacity = String(shown);
      figure.style.transform = `translate3d(0, ${(1 - shown) * 16}px, 0)`;
      media.style.transform = `scale(${1.035 - shown * 0.035})`;
    });
  });

  return (
    <section id="zones" className="screen-section bg-black">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
          Coverage
        </p>

        <div className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-4">
          {zones.map((zone, index) => (
            <button
              key={zone.id}
              type="button"
              ref={(node) => {
                figures.current[index] = node;
              }}
              aria-expanded={open === zone.id}
              aria-label={`Zoom in on ${zone.title}`}
              onClick={() => setOpen(zone.id)}
              className="relative block aspect-4/5 w-full cursor-zoom-in overflow-hidden text-left will-change-transform"
              style={{ opacity: 0, transform: "translate3d(0, 16px, 0)" }}
            >
              <div
                ref={(node) => {
                  medias.current[index] = node;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ transform: "scale(1.035)" }}
              >
                <Image
                  src={zone.image}
                  alt={zone.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
              />
              <span className="absolute bottom-4 left-4 text-[11px] tracking-[0.18em] text-white uppercase md:bottom-5 md:left-5">
                {zone.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {zone ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zone.title}
          className="fixed inset-0 z-50 cursor-zoom-out bg-black"
          onClick={() => setOpen(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zone.image}
            alt={zone.alt}
            className="coverage-zoom h-full w-full object-contain"
          />
          <p className="pointer-events-none absolute bottom-6 left-6 text-[11px] tracking-[0.18em] text-white uppercase md:bottom-8 md:left-10">
            {zone.title}
          </p>
        </div>
      ) : null}
    </section>
  );
}
