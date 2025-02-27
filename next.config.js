/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  experimental: {
    optimizeCss: true,
    modern: true
  },
  distDir: '.next',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  webpack(config) {
    return config;
  }
};

module.exports = nextConfig; 