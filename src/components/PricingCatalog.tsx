"use client";

import { useDeferredValue, useMemo, useState } from "react";
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

function matchesQuery(item: PricingItem, query: string) {
  if (!query) return true;
  const hay = `${item.label} ${item.size ?? ""}`.toLowerCase();
  return hay.includes(query);
}

function filterBrand(brand: PricingBrand, query: string): PricingFamily[] {
  if (!query) return brand.families;
  return brand.families
    .map((family) => ({
      ...family,
      items: family.items.filter((item) => matchesQuery(item, query)),
    }))
    .filter((family) => family.items.length > 0);
}

function brandSlug(brand: string) {
  return brand
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PricingCatalog() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      pricingBrands
        .map((brand) => ({
          brand,
          families: filterBrand(brand, deferredQuery),
        }))
        .filter((entry) => entry.families.length > 0),
    [deferredQuery],
  );

  const totalVisible = filtered.reduce(
    (sum, entry) =>
      sum + entry.families.reduce((s, family) => s + family.items.length, 0),
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reference…"
            className="field text-[15px]"
            autoComplete="off"
          />
        </label>
        <p className="text-[12px] tracking-[0.06em] text-ink-muted">
          {deferredQuery
            ? `${totalVisible} matches`
            : `${pricingBrands.reduce((s, b) => s + brandItemCount(b), 0)} references`}
        </p>
      </div>

      {!deferredQuery ? (
        <nav
          aria-label="Maisons"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-8"
        >
          {pricingBrands.map((brand) => (
            <a
              key={brand.brand}
              href={`#${brandSlug(brand.brand)}`}
              className="text-[13px] tracking-[0.06em] text-ink-muted uppercase transition-colors hover:text-ink"
            >
              {brand.brand}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="mt-12 space-y-20">
        {filtered.length === 0 ? (
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
        ) : (
          filtered.map(({ brand, families }) => {
            const showFamilyHeaders =
              families.length > 1 ||
              (families[0] && families[0].name !== "References");

            return (
              <section
                key={brand.brand}
                id={brandSlug(brand.brand)}
                className="scroll-mt-28"
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em]">
                    {brand.brand}
                  </h2>
                  <p className="text-[12px] tracking-[0.06em] text-ink-muted">
                    {families.reduce((s, f) => s + f.items.length, 0)} refs
                  </p>
                </div>

                <div className="mt-8 space-y-10">
                  {families.map((family) => (
                    <div key={`${brand.brand}-${family.name}`}>
                      {showFamilyHeaders ? (
                        <h3 className="text-[12px] font-medium tracking-[0.18em] text-ink-muted uppercase">
                          {family.name}
                        </h3>
                      ) : null}
                      <ul className={showFamilyHeaders ? "mt-4" : undefined}>
                        {family.items.map((item) => (
                          <li
                            key={`${item.label}-${item.size ?? ""}-${item.price}`}
                            className="flex items-baseline gap-3 py-2.5"
                          >
                            <div className="min-w-0 shrink">
                              <p className="text-[15px] tracking-[-0.01em] text-ink">
                                {item.label}
                                {item.size ? (
                                  <span className="text-ink-muted">
                                    {" "}
                                    ({item.size})
                                  </span>
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
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </div>

      <div className="mt-20 border-t border-line pt-12">
        <p className="text-[11px] font-medium tracking-[0.22em] text-ink-muted uppercase">
          Also available
        </p>
        <ul className="mt-6">
          {pricingExtras.map((extra) => (
            <li
              key={extra.label}
              className="flex items-baseline gap-3 py-2.5"
            >
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
        </div>
      </div>
    </div>
  );
}
