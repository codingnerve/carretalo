import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { campaigns } from "@/data/campaigns";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/locations", "/contact", "/faq", "/privacy-policy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.6,
    })),
    ...campaigns.map((campaign) => ({
      url: `${site.url}/${campaign.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
