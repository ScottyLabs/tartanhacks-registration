import type { AppProps } from "next/app"
import { ThemeProvider } from "@material-ui/styles"
import { theme } from "src/themes/theme"
import Head from "next/head"
import "styles/globals.css"
import { Provider } from "react-redux"
import store from "src/store"
import { ReactElement } from "react"

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>TartanHacks Registration</title>
        <meta name="description" content="Register for TartanHacks 2022!" />
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
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default App
