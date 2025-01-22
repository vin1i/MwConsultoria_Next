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

  async headers() {
    return [
      {
        source: "/imoveis/:path*", // Aplica os cabeçalhos às páginas de imóveis
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
          {
            key: "Content-Type",
            value: "text/html; charset=UTF-8",
          },
        ],
      },
    ];
  },
});

module.exports = nextConfig;
