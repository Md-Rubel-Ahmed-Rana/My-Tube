import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "172.27.144.1"],
};

export default nextConfig;
