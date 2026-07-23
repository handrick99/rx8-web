import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Specify",
    text: "Brand, model, reference.",
  },
  {
    n: "02",
    title: "Cut",
    text: "Film tailored to your watch’s geometry.",
  },
  {
    n: "03",
    title: "Fit",
    text: "Installed in person so every edge seats clean.",
  },
];

export function Installation() {
  return (
    <section id="fitting" className="min-h-[100svh] bg-[#141414] text-white">
      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 md:px-10">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.22em] text-white/45 uppercase">
              Installation
            </p>
            <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Fitted like the watch was made.
            </h2>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-white/55">
              RX8 is built around in-person installation. Each piece is treated as
              a finished object — measured, cut, and applied with the same care as
              the watch itself.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <ol className="mt-14 space-y-8 border-t border-white/12 pt-10">
              {steps.map((step) => (
                <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="pt-1 text-[12px] tracking-[0.12em] text-white/40">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[18px] font-medium tracking-[-0.01em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-white/50">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="relative min-h-[50svh] h-full w-full md:min-h-full" delay={120}>
          <div className="relative min-h-[50svh] h-full w-full md:absolute md:inset-0 md:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=1600&q=80"
              alt="Watch on a clean studio surface"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-[#141414]/50 to-transparent max-md:bg-gradient-to-t max-md:from-[#141414]/40 max-md:via-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
