/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production"
module.exports = {
  reactStrictMode: true,
  env: {
    HTTP_BASE_URL: isProduction ? "prod url" : "http://localhost:4000",
  },
}
