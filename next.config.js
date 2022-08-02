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
  async rewrites() {
    return [
      {
        source: "/patients",
        destination: "/dashboard/patients",
      },
      {
        source: "/appointments",
        destination: "/dashboard/appointments",
      },
      {
        source: "/settings/account",
        destination: "/dashboard/settings/account",
      },
      {
        source: "/settings/notifications",
        destination: "/dashboard/settings/notifications",
      },
      {
        source: "/settings/feedback",
        destination: "/dashboard/settings/feedback",
      },
    ];
  },
  // images: {
  //   loader: "imgix",
  //   path: "/",
  // },
});
