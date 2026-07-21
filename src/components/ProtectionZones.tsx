const zones = [
  {
    id: "bezel",
    title: "Bezel & crystal",
    text: "The face of the watch — polished edges, crystal, and the details you see first.",
    image: "/images/zones/bezel.jpg",
  },
  {
    id: "bracelet",
    title: "Bracelet",
    text: "Links and end pieces that take friction from desks, cuffs, and daily wear.",
    image: "/images/zones/bracelet.jpg",
  },
  {
    id: "clasp",
    title: "Clasp",
    text: "Hardware that opens, closes, and rests against skin — protected where it matters.",
    image: "/images/zones/clasp.jpg",
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
          {zones.map((zone) => (
            <article key={zone.id} className="min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
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
