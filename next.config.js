/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway optimizations
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig








