/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Локальные переменные окружения (при необходимости)
  },
  // Конфигурация для localhost
  async rewrites() {
    return [
      // При необходимости добавьте rewrites для локальной разработки
    ];
  },
};

module.exports = nextConfig; 