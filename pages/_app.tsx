import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactElement } from "react"
import { Provider } from "react-redux"
import Script from "next/script"
import store from "src/store"
import { theme } from "src/themes/theme"
import "styles/globals.scss"

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>TartanHacks</title>
        {/* Disable cache control */}
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <meta name="description" content="Register for TartanHacks" />
        <link rel="icon" href="/favicon.png" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
            page_path: window.location.pathname,
          });
          `}
        </Script>
      </Head>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <Component {...pageProps} />
          </StyledEngineProvider>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
