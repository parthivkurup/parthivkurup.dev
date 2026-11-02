import type { NextConfig } from "next";

// Fully static export: the build is plain HTML/CSS/JS in `out/`, so it runs on
// Vercel Hobby, Cloudflare Pages or GitHub Pages with zero serverless functions.
// Remove `output: "export"` only when a real backend (admin, auth, DB) lands.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
