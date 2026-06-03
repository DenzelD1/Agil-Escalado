import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard?view=table',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
