const withTM = require("next-transpile-modules")(["styled-components"]);

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  output: 'export', // Ativa exportação estática
  eslint: {
    ignoreDuringBuilds: true, // Ignorar erros do ESLint durante o build
  },
  reactStrictMode: true, // Ativar o modo estrito do React
  compiler: {
    styledComponents: true, // Habilitar suporte ao styled-components
  },
  images: {
    unoptimized: true, // Desabilitar otimização de imagens
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Permitir imagens do Cloudinary
        pathname: "/**", // Qualquer subcaminho
      },
    ],
  },
});

module.exports = nextConfig;
