import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.STATIC_EXPORT ? "./" : undefined,
};

export default nextConfig;
