import type { Metadata } from "next";
import { PricingCatalog } from "@/components/PricingCatalog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { JsonLd } from "@/components/JsonLd";
import { catalogInventory, pricingIntro } from "@/data/pricing";
import { pageMetadata } from "@/lib/metadata";
import { pricingJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Watch Protection Film Prices for Rolex, Patek Philippe and AP",
  description: `Protection film prices for ${catalogInventory().models} watch references from Rolex, Patek Philippe, Audemars Piguet, Richard Mille, Vacheron Constantin and more. Installation and a one-year warranty included.`,
});

export default function PricingPage() {
  return (
    <>
      <JsonLd data={pricingJsonLd()} />
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
