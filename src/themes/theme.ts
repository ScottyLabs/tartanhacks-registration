import { createTheme } from "@material-ui/core"
import { green } from "@material-ui/core/colors"

export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[100],
    },
  },
})
