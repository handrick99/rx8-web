import { EMAIL } from "@/data/contact";
import { faqItems } from "@/data/faq";
import { pricingBrands, type PricingBrand, type PricingFamily } from "@/data/pricing";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/data/site";

const BUSINESS_ID = `${SITE_URL}/#business`;

function numericPrices() {
  return pricingBrands.flatMap((brand) =>
    brand.families.flatMap((family) =>
      family.items.flatMap((item) => (typeof item.price === "number" ? [item.price] : [])),
    ),
  );
}

function modelName(brand: PricingBrand, family: PricingFamily, label: string) {
  const clean = (text: string) => text.replace(/\s+—\s+/g, ", ");
  if (brand.brand.includes("·")) return clean(label);
  if (family.name === "References" || family.name === "Other") {
    return clean(`${brand.brand} ${label}`);
  }
  return clean(`${brand.brand} ${family.name} ${label}`);
}

export function businessJsonLd() {
  const prices = numericPrices();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": BUSINESS_ID },
      },
      {
        "@type": "LocalBusiness",
        "@id": BUSINESS_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/images/og.jpg`,
        logo: `${SITE_URL}/icon.png`,
        telephone: "+1-323-800-2154",
        email: EMAIL,
        priceRange: `$${Math.min(...prices)} to $${Math.max(...prices)}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Los Angeles",
          addressRegion: "CA",
          addressCountry: "US",
        },
        areaServed: { "@type": "AdministrativeArea", name: "Greater Los Angeles" },
        knowsAbout: [
          "Watch protection film",
          "Paint protection film for watches",
          "Luxury watch scratch protection",
        ],
      },
    ],
  };
}

export function pricingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Watch protection film installation",
    serviceType: "Watch protection film",
    description:
      "Pre-cut, self-healing TPU film fitted to the case, bezel, bracelet and clasp. Installation and a one-year warranty are included in every price.",
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Greater Los Angeles" },
    url: `${SITE_URL}/pricing`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Watch protection film by reference",
      itemListElement: pricingBrands.map((brand) => ({
        "@type": "OfferCatalog",
        name: brand.brand.split("·").map((name) => name.trim()).join(", "),
        itemListElement: brand.families.flatMap((family) =>
          family.items.flatMap((item) =>
            typeof item.price === "number"
              ? [
                  {
                    "@type": "Offer",
                    name: `${modelName(brand, family, item.label)} protection film`,
                    price: item.price,
                    priceCurrency: "USD",
                  },
                ]
              : [],
          ),
        ),
      })),
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
