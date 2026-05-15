import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(config)
