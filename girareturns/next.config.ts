/** next.config.ts */
import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export',
  // Isso força o Next.js a gerar as rotas como `login.html` em vez de `/login/index.html`
  trailingSlash: false,

  // Movido para a raiz e ignorando erro de tipagem temporário do Next.js 16
  // @ts-ignore
  turbopack: {},

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default withPWA(nextConfig);