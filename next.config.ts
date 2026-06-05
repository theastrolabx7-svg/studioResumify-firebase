
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  distDir: 'dist', // Required output directory for this environment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    allowedDevOrigins: [
      '6000-firebase-studio-1780655137520.cluster-cd3bsnf6r5bemwki2bxljme5as.cloudworkstations.dev',
      '9000-firebase-studio-1780655137520.cluster-cd3bsnf6r5bemwki2bxljme5as.cloudworkstations.dev',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
