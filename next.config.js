const withTM = require("next-transpile-modules")(["styled-components"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  trailingSlash: true, // Garante que as rotas terminem com "/"
  // output: "export", // Removido para permitir SSR ou ISR
});

module.exports = nextConfig;
