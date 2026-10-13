import { FilmSection } from "@/components/FilmSection";
import { FittingForm } from "@/components/FittingForm";
import { Hero } from "@/components/Hero";
import { Installation } from "@/components/Installation";
import { ProtectionZones } from "@/components/ProtectionZones";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav />
      <main>
        <Hero />
        <FilmSection />
        <ProtectionZones />
        <Installation />
        <FittingForm />
      </main>
      <SiteFooter />
    </>
  );
}
