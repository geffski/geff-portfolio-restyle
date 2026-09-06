import type { MetadataRoute } from "next";

const siteUrl = "https://geff-portfolio-showcases-20260809.geff.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
