const zones = [
  {
    id: "case",
    title: "Case & lugs",
    text: "Where desks, doorframes, and daily contact leave marks first.",
    slot: "Photo — case & lugs",
    image: null as string | null,
  },
  {
    id: "bezel",
    title: "Bezel & edges",
    text: "Bright-work and corners that catch light — and wear — the most.",
    slot: "Photo — bezel",
    image: null as string | null,
  },
  {
    id: "bracelet",
    title: "Bracelet & clasp",
    text: "Links, end links, and clasp hardware under constant friction.",
    slot: "Photo — bracelet",
    image: "/images/zones/bracelet.jpg",
  },
];

export function ProtectionZones() {
  return (
    <section id="zones" className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
          Coverage
        </p>
        <h2 className="font-display mt-5 max-w-[16ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Where the film earns its place.
        </h2>
        <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted">
          We protect the zones that take the hits — cut to your reference, not
          a generic sheet.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {zones.map((zone, i) => (
            <article key={zone.id} className="min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                {zone.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={zone.image}
                    alt={zone.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(160deg,#e8e4db_0%,#f4f1ea_50%,#ddd8cf_100%)] px-6 text-center">
                    <span className="text-[11px] tracking-[0.2em] text-ink-muted uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] tracking-[0.04em] text-ink-muted">
                      {zone.slot}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-display mt-6 text-[20px] font-medium tracking-[-0.01em]">
                {zone.title}
              </h3>
              <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-ink-muted">
                {zone.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
