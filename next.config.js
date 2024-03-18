const path = require("path");

// const phaserModule = path.join(__dirname, "/node_modules/phaser-ce/");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
