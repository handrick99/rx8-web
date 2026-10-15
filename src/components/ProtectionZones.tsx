"use client";

import { useRef } from "react";
import Image from "next/image";
import { enterProgress, useScrollFrame, type MotionMode } from "@/lib/scrollFrame";

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

  useScrollFrame((mode: MotionMode) => {
    figures.current.forEach((figure, index) => {
      const media = medias.current[index];
      if (!figure || !media) return;
      if (mode === "off") {
        figure.style.opacity = "1";
        figure.style.transform = "none";
        media.style.transform = "none";
        return;
      }
      const lead = mode === "lite" ? index * 28 : index * 56;
      const shown = enterProgress(figure, lead);
      const lift = mode === "lite" ? 10 : 16;
      figure.style.opacity = String(shown);
      figure.style.transform = `translate3d(0, ${(1 - shown) * lift}px, 0)`;
      media.style.transform =
        mode === "full" ? `scale(${1.035 - shown * 0.035})` : "none";
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
            <figure
              key={zone.id}
              ref={(node) => {
                figures.current[index] = node;
              }}
              className="group relative aspect-4/5 w-full overflow-hidden will-change-transform"
              style={{ opacity: 0, transform: "translate3d(0, 16px, 0)" }}
            >
              <div
                ref={(node) => {
                  medias.current[index] = node;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ transform: "scale(1.035)" }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-125">
                  <Image
                    src={zone.image}
                    alt={zone.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"
              />
              <figcaption className="absolute bottom-4 left-4 text-[11px] tracking-[0.18em] text-white uppercase md:bottom-5 md:left-5">
                {zone.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
