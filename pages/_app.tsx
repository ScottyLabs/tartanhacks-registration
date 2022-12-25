import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ReactElement } from "react"
import { Provider } from "react-redux"
import store from "src/store"
import { theme } from "src/themes/theme"
import "styles/globals.scss"

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>TartanHacks</title>
        <meta name="description" content="Register for TartanHacks" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GDT87TLX5E"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GDT87TLX5E', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

export default App
