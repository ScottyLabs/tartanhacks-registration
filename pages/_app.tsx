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
        <meta name="description" content="TartanHacks Registration System" />
        <link rel="icon" href="/favicon.ico" />
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
