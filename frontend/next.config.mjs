/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      }
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;