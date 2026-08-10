import type { MetadataRoute } from "next";

const siteUrl = "https://geff-palette-lab.geff.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
