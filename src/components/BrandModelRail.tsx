"use client";

import { useState } from "react";
import { maisons } from "@/data/maisons";

type Props = {
  onModelSelect?: (brand: string, model: string) => void;
};

export function BrandModelRail({ onModelSelect }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const active = maisons[activeIndex];

  return (
    <section id="browse" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
          Nearly 700 models · 26+ maisons
        </p>
        <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Find your watch.
        </h2>
        <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-ink-muted">
          Choose a brand, then a reference. We’ll cut the film to your piece.
        </p>

        <div className="mt-16">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
              Maisons
            </p>
            <p className="text-[11px] tracking-[0.08em] text-ink-muted">
              {String(activeIndex + 1).padStart(2, "0")} —{" "}
              {String(maisons.length).padStart(2, "0")}
            </p>
          </div>

          <div className="rail-scroll pb-4">
            {maisons.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={item.brand}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="relative pb-3 text-left text-[13px] tracking-[0.08em] uppercase transition-[color,letter-spacing] duration-300"
                  style={{
                    color: isActive ? "var(--ink)" : "var(--ink-muted)",
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: isActive ? "0.04em" : "0.08em",
                  }}
                >
                  {item.brand}
                  <span
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-300"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </button>
              );
            })}
          </div>

          <div className="h-px w-full bg-line" />

          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-medium tracking-[-0.02em]">
              {active.brand}
            </p>
            <p className="text-[12px] tracking-[0.06em] text-ink-muted">
              {active.models.length} references
            </p>
          </div>

          <div className="rail-scroll mt-6 pb-1">
            {active.models.map((model) => {
              const hot = hoveredModel === model;
              return (
                <button
                  key={`${active.brand}-${model}`}
                  type="button"
                  onMouseEnter={() => setHoveredModel(model)}
                  onMouseLeave={() => setHoveredModel(null)}
                  onClick={() => onModelSelect?.(active.brand, model)}
                  className="border-b border-transparent pb-0.5 text-[17px] tracking-[0.01em] transition-colors duration-200"
                  style={{
                    color: hot ? "var(--ink)" : "var(--ink-muted)",
                    borderBottomColor: hot ? "var(--ink)" : "transparent",
                  }}
                >
                  {model}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
