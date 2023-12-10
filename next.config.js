/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lpdslyparnegftnuypwd.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
