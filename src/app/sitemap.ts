import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: Array<[path: string, priority: number]> = [
    ["", 1],
    ["/pricing", 0.9],
    ["/protect", 0.8],
    ["/qa", 0.8],
    ["/sourcing", 0.5],
  ];

  return pages.map(([path, priority]) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
