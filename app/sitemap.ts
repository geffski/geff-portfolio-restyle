import type { MetadataRoute } from "next";

const siteUrl = "https://geff-portfolio-showcases-20260809.geff.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "it-IT": `${siteUrl}/it`,
    en: `${siteUrl}/en`,
  };

  return ["it", "en"].map((locale) => ({
    url: `${siteUrl}/${locale}`,
    changeFrequency: "monthly" as const,
    priority: locale === "it" ? 1 : 0.9,
    alternates: { languages },
  }));
}
