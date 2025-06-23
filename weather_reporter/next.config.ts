import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.weatherapi.com"],
    formats: ["image/webp"],
  },
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
};

export default nextConfig;
