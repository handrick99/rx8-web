import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SourcingInquiryForm } from "@/components/SourcingInquiryForm";
import { sourcingFaq } from "@/data/sourcing-faq";

export const metadata: Metadata = {
  title: "Watch Sourcing | RX8",
  description:
    "Tell us the watch. We source it internationally, quote one landed price more competitive than local, and accept trade ins.",
};

const steps = [
  {
    n: "01",
    title: "Tell us",
    text: "Choose the brand and model, or describe another piece, and enter your budget.",
  },
  {
    n: "02",
    title: "We quote",
    text: "One landed price, sourced internationally and more competitive than local. Trade ins are accepted.",
  },
  {
    n: "03",
    title: "You receive it",
    text: "We verify the watch, then deliver it. RX8 film is available at a discount.",
  },
];

export default function SourcingPage() {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav variant="solid" />
      <main className="bg-bg">
        <section className="mx-auto max-w-[900px] px-6 pb-8 pt-28 md:px-10 md:pt-32">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Sourcing
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            The watch you want, found and protected.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted">
            Choose a watch and a budget. We source it internationally, quote
            one price more competitive than local, and accept trade ins.
          </p>
          <a
            href="#inquiry"
            className="mt-10 inline-flex bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Start an inquiry
          </a>
        </section>

        <section className="mx-auto max-w-[900px] px-6 py-16 md:px-10 md:py-24">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            How it works
          </p>
          <ol className="mt-10 space-y-8">
            {steps.map((step) => (
              <li key={step.n} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className="pt-1 text-[12px] tracking-[0.12em] text-ink-muted">
                  {step.n}
                </span>
                <div>
                  <h2 className="font-display text-[18px] font-medium tracking-[-0.01em]">
                    {step.title}
                  </h2>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-ink-muted">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="inquiry"
          className="mx-auto max-w-[900px] scroll-mt-28 px-6 pb-16 md:px-10 md:pb-24"
        >
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Inquiry
          </p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Tell us the watch.
          </h2>
          <div className="mt-12">
            <SourcingInquiryForm />
          </div>
        </section>

        <section className="mx-auto max-w-[900px] px-6 pb-16 md:px-10 md:pb-24">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Questions
          </p>
          <div className="mt-8">
            <FaqList items={sourcingFaq} />
          </div>
        </section>

        <section className="mx-auto max-w-[900px] px-6 pb-24 md:px-10 md:pb-32">
          <p className="max-w-[52ch] text-[13px] leading-relaxed text-ink-muted">
            RX8 is an independent sourcing service and is not affiliated with
            or an authorized dealer of any watch brand mentioned on this site.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
