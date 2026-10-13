"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  brandItemCount,
  formatPrice,
  pricingBrands,
  pricingExtras,
  pricingFilm,
  pricingNote,
  type PricingBrand,
  type PricingFamily,
  type PricingItem,
} from "@/data/pricing";

const collapsedBrands = new Set(["Rolex"]);

function matchesQuery(item: PricingItem, query: string) {
  const hay = `${item.label} ${item.size ?? ""}`.toLowerCase();
  return hay.includes(query);
}

function filterBrand(brand: PricingBrand, query: string): PricingFamily[] {
  return brand.families
    .map((family) => ({
      ...family,
      items: family.items.filter((item) => matchesQuery(item, query)),
    }))
    .filter((family) => family.items.length > 0);
}

function familyKey(brand: string, family: string) {
  return `${brand}::${family}`;
}

function PriceRows({ items }: { items: PricingItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={`${item.label}-${item.size ?? ""}-${item.price}`}
          className="flex items-baseline gap-3 py-2.5"
        >
          <div className="min-w-0 shrink">
            <p className="text-[15px] tracking-[-0.01em] text-ink">
              {item.label}
              {item.size ? (
                <span className="text-ink-muted"> ({item.size})</span>
              ) : null}
            </p>
          </div>
          <span
            aria-hidden
            className="mb-1 min-w-8 flex-1 border-b border-dotted border-line"
          />
          <p className="shrink-0 text-[15px] tabular-nums tracking-[-0.01em] text-ink">
            {formatPrice(item.price)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function PricingCatalog() {
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [openFamilies, setOpenFamilies] = useState<Set<string>>(() => new Set());
  const [showTop, setShowTop] = useState(false);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const searching = deferredQuery.length > 0;

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  function chooseBrand(brand: string) {
    setSelectedBrand(brand);
    setQuery("");
  }

  function toggleFamily(key: string) {
    setOpenFamilies((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const visible = useMemo(() => {
    if (searching) {
      return pricingBrands
        .map((brand) => ({
          brand,
          families: filterBrand(brand, deferredQuery),
        }))
        .filter((entry) => entry.families.length > 0);
    }
    if (!selectedBrand) return [];
    const brand = pricingBrands.find((item) => item.brand === selectedBrand);
    if (!brand) return [];
    return [{ brand, families: brand.families }];
  }, [deferredQuery, searching, selectedBrand]);

  const totalVisible = visible.reduce(
    (sum, entry) =>
      sum + entry.families.reduce((count, family) => count + family.items.length, 0),
    0,
  );

  const catalogCount = pricingBrands.reduce(
    (sum, brand) => sum + brandItemCount(brand),
    0,
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <label className="block w-full max-w-sm">
          <span className="sr-only">Search references</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reference…"
            className="field text-[15px]"
            autoComplete="off"
          />
        </label>
        <p className="text-[12px] tracking-[0.06em] text-ink-muted">
          {searching
            ? `${totalVisible} ${totalVisible === 1 ? "match" : "matches"}`
            : `${catalogCount} references`}
        </p>
      </div>

      <nav
        aria-label="Maisons"
        className="-mx-6 mt-8 flex gap-x-6 overflow-x-auto border-b border-line px-6 pb-8 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {pricingBrands.map((brand) => {
          const selected = selectedBrand === brand.brand && !searching;
          return (
            <button
              key={brand.brand}
              type="button"
              aria-pressed={selected}
              onClick={(event) => {
                chooseBrand(brand.brand);
                event.currentTarget.scrollIntoView({
                  inline: "nearest",
                  block: "nearest",
                });
              }}
              className={`shrink-0 whitespace-nowrap text-[13px] tracking-[0.06em] uppercase transition-colors ${
                selected ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {brand.brand}
            </button>
          );
        })}
      </nav>

      <div className="mt-12 space-y-20">
        {searching && visible.length === 0 ? (
          <p className="text-[15px] text-ink-muted">
            No references match “{query.trim()}”. Try another reference, or{" "}
            <a
              href="/#request"
              className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              request a fitting
            </a>
            .
          </p>
        ) : null}

        {!searching && !selectedBrand ? (
          <p className="text-[15px] text-ink-muted">Choose a brand.</p>
        ) : null}

        {visible.map(({ brand, families }) => {
          const collapseFamilies = collapsedBrands.has(brand.brand) && !searching;
          const refCount = families.reduce(
            (sum, family) => sum + family.items.length,
            0,
          );
          const showFamilyHeaders =
            families.length > 1 ||
            (families[0] && families[0].name !== "References");

          return (
            <section key={brand.brand}>
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em]">
                  {brand.brand}
                </h2>
                <p className="text-[12px] tracking-[0.06em] text-ink-muted">
                  {refCount} {refCount === 1 ? "ref" : "refs"}
                </p>
              </div>

              <div className="mt-8 space-y-10">
                {families.map((family) => {
                  const key = familyKey(brand.brand, family.name);
                  const open = !collapseFamilies || openFamilies.has(key);

                  return (
                    <div key={key}>
                      {showFamilyHeaders ? (
                        collapseFamilies ? (
                          <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => toggleFamily(key)}
                            className="flex w-full items-baseline justify-between gap-4 text-left"
                          >
                            <span className="text-[12px] font-medium tracking-[0.18em] text-ink-muted uppercase">
                              {family.name}
                            </span>
                            <span className="flex items-baseline gap-4 text-[12px] tracking-[0.12em] text-ink-muted">
                              <span>{family.items.length}</span>
                              <span aria-hidden>{open ? "—" : "+"}</span>
                            </span>
                          </button>
                        ) : (
                          <h3 className="text-[12px] font-medium tracking-[0.18em] text-ink-muted uppercase">
                            {family.name}
                          </h3>
                        )
                      ) : null}
                      {open ? (
                        <div className={showFamilyHeaders ? "mt-4" : undefined}>
                          <PriceRows items={family.items} />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-20 border-t border-line pt-12">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
          Also available
        </p>
        <ul className="mt-6">
          {pricingExtras.map((extra) => (
            <li key={extra.label} className="flex items-baseline gap-3 py-2.5">
              <p className="min-w-0 shrink text-[15px] text-ink">{extra.label}</p>
              <span
                aria-hidden
                className="mb-1 min-w-8 flex-1 border-b border-dotted border-line"
              />
              <p className="shrink-0 text-[15px] tabular-nums text-ink-muted">
                {extra.price}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[48ch] text-[14px] leading-relaxed text-ink-muted">
          {pricingNote}
        </p>
        <p className="mt-4 max-w-[48ch] text-[14px] leading-relaxed text-ink-muted">
          {pricingFilm}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="/#request"
            className="inline-flex items-center bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-90"
          >
            Request a fitting
          </a>
          <a
            href="/"
            className="text-[13px] tracking-[0.04em] text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Back to studio
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="text-[13px] tracking-[0.04em] text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Back to top
          </button>
        </div>
      </div>
      {showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 flex h-11 w-11 items-center justify-center border border-white/15 bg-bg/35 text-ink/80 backdrop-blur-sm"
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
          >
            <path d="M8 12.5V3.5M8 3.5 4.5 7M8 3.5 11.5 7" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
