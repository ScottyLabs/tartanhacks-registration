const isProduction = process.env.NODE_ENV === "production"
module.exports = {
  target: 'serverless',
  poweredByHeader: false,
  reactStrictMode: false,
  env: {
    HTTP_BASE_URL: isProduction ? "prod url" : "http://localhost:4000",
  },
}
