/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
     domains: ["east.ovh", process.env.NEXT_PUBLIC_ASSETS_HOSTNAME], 
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  }
}

export default nextConfig

