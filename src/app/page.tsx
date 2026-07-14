"use client";

import { useState } from "react";
import { BrandModelRail } from "@/components/BrandModelRail";
import { FilmSection } from "@/components/FilmSection";
import { FittingForm } from "@/components/FittingForm";
import { Hero } from "@/components/Hero";
import { Installation } from "@/components/Installation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export default function Home() {
  const [prefill, setPrefill] = useState<{ brand?: string; model?: string }>(
    {},
  );

  return (
    <>
      <div className="site-grain" aria-hidden />
      <SiteNav />
      <main>
        <Hero />
        <FilmSection />
        <BrandModelRail
          onModelSelect={(brand, model) => {
            setPrefill({ brand, model });
            document.getElementById("request")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />
        <Installation />
        <FittingForm prefill={prefill} />
      </main>
      <SiteFooter />
    </>
  );
}
