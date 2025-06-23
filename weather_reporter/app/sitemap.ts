import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://weather-reporter-ten.vercel.app",
      lastModified: new Date(),
    },
  ];
}
