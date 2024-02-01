const withBundleAnalyzer = require('@next/bundle-analyzer')({
   enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '/f/*',
         },
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
         },
         {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
         },
      ],
   },
}

module.exports = withBundleAnalyzer(nextConfig)
