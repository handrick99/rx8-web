import { FittingForm } from "@/components/FittingForm";
import { Hero } from "@/components/Hero";
import { Installation } from "@/components/Installation";
import { ProtectionZones } from "@/components/ProtectionZones";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteLoader } from "@/components/SiteLoader";
import { SiteNav } from "@/components/SiteNav";
import { catalogInventory } from "@/data/pricing";

export default function Home() {
  const inventory = catalogInventory();

  return (
    <>
      <SiteLoader />
      <div className="site-grain" aria-hidden />
      <SiteNav />
      <main>
        <Hero />
        <ProtectionZones />
        <Installation brands={inventory.brands} models={inventory.models} />
        <FittingForm />
      </main>
      <SiteFooter />
    </>
  );
}
