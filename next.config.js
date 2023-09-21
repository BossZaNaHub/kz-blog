const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "github.com", "localhost"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "",
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: ""
    //   }
    // ],
  },
};

module.exports = nextConfig;
