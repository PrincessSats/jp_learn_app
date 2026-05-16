import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    optimizePackageImports: ["framer-motion", "sql.js"],
  },
};

export default nextConfig;
