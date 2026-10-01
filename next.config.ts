import type { NextConfig } from "next";

/**
 * Static export for Hostinger (Apache shared hosting).
 * `npm run build` writes a plain HTML/CSS/JS site to `out/`.
 * Security headers, caching and the 404 page live in `public/.htaccess`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
