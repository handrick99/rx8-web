import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-bg"
    >
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#ebe7df_0%,transparent_55%),linear-gradient(160deg,#f7f5f1_0%,#ebe6dc_45%,#e4dfd4_100%)]"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-end md:grid-cols-12 md:items-center">
        <div className="z-10 flex flex-col justify-end px-6 pb-16 pt-28 md:col-span-5 md:px-10 md:pb-24 md:pt-20">
          <p className="font-display animate-rise text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-ink">
            RX8
            <br />
            STUDIO
          </p>
          <h1 className="animate-rise delay-1 mt-8 max-w-[18ch] text-[clamp(1.35rem,2.4vw,1.85rem)] font-light leading-snug tracking-[-0.02em] text-ink">
            Invisible armor for watches built to last.
          </h1>
          <p className="animate-rise delay-2 mt-5 max-w-[34ch] text-[15px] leading-relaxed text-ink-muted">
            Tailor-cut protection film. Nearly undetectable. Fitted in person.
          </p>
          <div className="animate-rise delay-3 mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#browse"
              className="inline-flex items-center bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-85"
            >
              Protect your watch
            </a>
            <a
              href="#request"
              className="text-[13px] tracking-[0.04em] text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Book a fitting
            </a>
          </div>
        </div>

        <div className="relative md:col-span-7">
          <div className="animate-image relative aspect-[4/5] w-full md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:h-full md:min-h-[100svh] md:w-[58vw] md:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1800&q=80"
              alt="Luxury watch in soft daylight"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-[center_30%]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-bg via-bg/20 to-transparent max-md:bg-gradient-to-t max-md:from-bg max-md:via-transparent max-md:to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
