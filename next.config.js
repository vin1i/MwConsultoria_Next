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

  async rewrites() {
    const destinationHost = "https://mwconsultoriaimobiliaria.com.br" || "https://mwconsultoriaimobiliaria.com.br/imoveis" || "https://mwconsultoriaimobiliaria.com.br/login";

    return [
      // Todas as rotas da LP
      {
        source: "/:path*",
        destination: "/:path*",
      },

      // Arquivos estáticos do App
      {
        source: "/favicon.ico",
        destination: `${destinationHost}/favicon.ico`,
      },
      {
        source: "/static/:path*",
        destination: `${destinationHost}/static/:path*`,
      },
      {
        source: "/fonts/:path*",
        destination: `${destinationHost}/fonts/:path*`,
      },

      // Rotas específicas para pré-visualização de links
      {
        source: "/imoveis/:id",
        destination: `/_preview/imoveis/:id`,
      },

      // Redirecionar rotas já processadas
      {
        source: "/:path*",
        has: [{ type: "query", key: "from_landing" }],
        destination: `${destinationHost}/:path*`,
      },

      // Fallback para outras rotas
      {
        source: "/:path*",
        destination: `${destinationHost}/:path*`,
      },
    ];
  },
});

module.exports = nextConfig;
