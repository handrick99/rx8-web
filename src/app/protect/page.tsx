import type { Metadata } from "next";
import { FilmSection } from "@/components/FilmSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  path: "/protect",
  title: "Self-Healing Watch Protection Film",
  description:
    "RX8 S Series film is ultra-thin, self-healing TPU with gloss and matte finishes matched to your watch. Nearly invisible, fully reversible, built to endure.",
});

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
