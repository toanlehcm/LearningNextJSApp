import type { NextConfig } from 'next'

const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: ''
      }
    ]
  },
  compiler: {
    styledComponents: true
  }
}

module.exports = withNextIntl(nextConfig)
