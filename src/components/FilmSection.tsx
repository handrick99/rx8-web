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
    <section id="protect" className="relative min-h-[100svh] overflow-hidden bg-bg">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/film-cut.jpg"
          alt="Precision-cut watch film"
          className="h-full w-full object-cover object-[center_42%]"
        />
      </div>
      <div className="relative z-10 flex min-h-[100svh] items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pt-28 pb-14 text-[#141414] md:px-10 md:pb-20">
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#141414]/60 uppercase">
            The film
          </p>
          <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Built to disappear. Meant to endure.
          </h2>
          <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-12">
            {points.map((point) => (
              <div key={point.label}>
                <h3 className="font-display text-[18px] font-medium tracking-[-0.01em]">
                  {point.label}
                </h3>
                <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-[#141414]/60">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
