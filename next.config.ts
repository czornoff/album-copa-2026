import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/album-copa-2026",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
