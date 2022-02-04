/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENCAGE_API_KEY: process.env.OPENCAGE_API_KEY,
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY
  }
}

module.exports = nextConfig
