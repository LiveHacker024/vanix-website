import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/config/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // All 14 Service Detail Pages
  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...serviceRoutes];
}
