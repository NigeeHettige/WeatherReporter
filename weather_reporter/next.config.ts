import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.weatherapi.com"],
  },
  productionBrowserSourceMaps: false, 
  experimental: {
    serverSourceMaps: false, 
    
  },
};

export default nextConfig;
