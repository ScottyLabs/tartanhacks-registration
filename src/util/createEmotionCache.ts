// From https://github.com/mui/material-ui/blob/94bc99fba75c89372f98da7cfe503e610816d99a/examples/nextjs-with-typescript/src/createEmotionCache.ts
import createCache from "@emotion/cache"

const isBrowser = typeof document !== "undefined"

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  let insertionPoint

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      // eslint-disable-next-line @typescript-eslint/quotes
      'meta[name="emotion-insertion-point"]'
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: "mui-style", insertionPoint })
}
