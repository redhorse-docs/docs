import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techbullion.com",
      },
      {
        protocol: "https",
        hostname: "asiatokenfund.com",
      },
      {
        protocol: "https",
        hostname: "bitchainnews.com",
      },
      {
        protocol: "https",
        hostname: "worldcryptotimes.com",
      },
      {
        protocol: "https",
        hostname: "firstcryptonews.com",
      },
      {
        protocol: "https",
        hostname: "rolebitcoin.com",
      },
      {
        protocol: "https",
        hostname: "www.encryptbusiness.com",
      },
      {
        protocol: "https",
        hostname: "www.blockchainnewsportal.com",
      },
      {
        protocol: "https",
        hostname: "blog.naver.com",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
      },
      {
        protocol: "https",
        hostname: "www.patrontimes.co.kr",
      },
    ],
  },
};

export default nextConfig;
