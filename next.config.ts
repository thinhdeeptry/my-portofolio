import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['bihrzjtycfafzdasicag.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bihrzjtycfafzdasicag.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
