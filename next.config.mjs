/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'nishatlinen.com',
        pathname: '/cdn/shop/files/**',
      },
    ],
  },
};

export default nextConfig;