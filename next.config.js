const path = require("path");

// const phaserModule = path.join(__dirname, "/node_modules/phaser-ce/");

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
