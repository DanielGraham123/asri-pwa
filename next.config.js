/** @type {import('next').NextConfig} */
const pwaConfig = require("next-pwa");

module.exports = pwaConfig({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  images: {
    loader: "imgix",
    path: "/",
  },
});
