import { Reveal } from "@/components/Reveal";

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

export function FilmSection() {
  return (
    <section id="protect" className="screen-section relative bg-bg-soft">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            The film
          </p>
          <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Built to disappear. Meant to endure.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-16">
          {points.map((point, i) => (
            <Reveal key={point.label} delay={80 + i * 90}>
              <h3 className="font-display text-[18px] font-medium tracking-[-0.01em]">
                {point.label}
              </h3>
              <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-ink-muted">
                {point.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
