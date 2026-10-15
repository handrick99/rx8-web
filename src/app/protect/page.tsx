import type { Metadata } from "next";
import { FilmSection } from "@/components/FilmSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Protect — RX8 Studio",
  description:
    "RX8 protection film technology. Built to disappear. Meant to endure.",
};

export default function ProtectPage() {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav variant="solid" />
      <main>
        <FilmSection />
      </main>
      <SiteFooter />
    </>
  );
}
