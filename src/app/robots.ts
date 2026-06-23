import type { MetadataRoute } from "next";

const SITE_URL = "https://tushardhankhar.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep the CMS and API endpoints out of the index.
      disallow: ["/studio", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
