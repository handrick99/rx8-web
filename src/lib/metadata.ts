import type { Metadata } from "next";
import { SITE_NAME } from "@/data/site";

const SHARE_IMAGE = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "Protection film being fitted to a rose gold Patek Philippe Nautilus at RX8 Studio",
};

/** Child segments replace the parent's openGraph object, so each page sets the full set. */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [SHARE_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE] },
  };
}
