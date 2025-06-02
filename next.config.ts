import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ikobana-bucket.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  devIndicators: false,
};

export default nextConfig;
