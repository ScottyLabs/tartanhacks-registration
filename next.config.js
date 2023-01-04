const backends = {
  local: "http://localhost:4000",
  development: "https://dev.backend.tartanhacks.com",
  staging: "https://stg.backend.tartanhacks.com",
  production: "https://backend.tartanhacks.com"
}
module.exports = {
  poweredByHeader: false,
  reactStrictMode: false,
  env: {
    BACKEND_URL: backends[process.env.APP_ENV || "development"]
  }
}
