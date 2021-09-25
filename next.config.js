const isProduction = process.env.NODE_ENV === "production"
module.exports = {
  target: "serverless",
  poweredByHeader: false,
  reactStrictMode: false,
  env: {
    BACKEND_URL: isProduction ? "http://tartanhacks-backend.herokuapp.com" : "http://localhost:4000"
  }
}
