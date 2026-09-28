import type { Metadata } from "next";
import { PricingCatalog } from "@/components/PricingCatalog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { pricingIntro } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing — RX8 Studio",
  description:
    "Watch protection film pricing by reference. Installation and one-year warranty included.",
};

export default function PricingPage() {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav variant="solid" />
      <main className="bg-bg">
        <section className="mx-auto max-w-[900px] px-6 pb-24 pt-28 md:px-10 md:pb-32 md:pt-32">
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
            Pricing
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            Price list.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted">
            {pricingIntro}
          </p>

          <div className="mt-14">
            <PricingCatalog />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
