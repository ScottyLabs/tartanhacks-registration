import { createTheme } from "@material-ui/core"
import { green } from "@material-ui/core/colors"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F3964A"
    },
    secondary: {
      main: green[100]
    }
  },
  typography: {
    fontFamily: "Poppins, sans-serif"
  }
})
