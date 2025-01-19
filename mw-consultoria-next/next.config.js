const withTM = require("next-transpile-modules")(["styled-components"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
});

module.exports = nextConfig;
