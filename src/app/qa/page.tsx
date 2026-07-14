import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/data/contact";

export const metadata: Metadata = {
  title: "Q&A — RX8 Studio",
  description:
    "Answers on installation, care, water use, self-healing film, and warranty.",
};

export default function QaPage() {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav variant="solid" />
      <main className="bg-bg">
        <section className="mx-auto max-w-[900px] px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-32">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Q&A
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Common questions.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted">
            Straight answers on fit, care, water, and warranty — translated from
            our studio guidance.
          </p>

          <div className="mt-14">
            <FaqList />
          </div>

          <p className="mt-14 text-[15px] text-ink-muted">
            Still unsure?{" "}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>{" "}
            or{" "}
            <a
              href="/#request"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              request a fitting
            </a>
            .
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
