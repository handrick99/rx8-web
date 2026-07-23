const slots = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  label: `Install ${String(i + 1).padStart(2, "0")}`,
}));

export function SocialProof() {
  return (
    <section id="proof" className="screen-section bg-bg-soft">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
              Studio
            </p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Seen on wrists that get worn.
            </h2>
          </div>
          <p className="max-w-[34ch] text-[15px] leading-relaxed text-ink-muted md:pb-1">
            Real fittings and finished pieces. Drop your photos in and this grid
            fills — no collage chrome, just the work.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="relative aspect-square overflow-hidden bg-bg"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="text-[11px] tracking-[0.18em] text-ink-muted uppercase">
                  Photo soon
                </span>
                <span className="text-[12px] text-ink-muted/80">{slot.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
