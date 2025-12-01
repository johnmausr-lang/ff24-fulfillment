/** @type {import('next').NextConfig} */
const nextConfig = {
  // Добавление 'mjs' для поддержки современного синтаксиса
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
