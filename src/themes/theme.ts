import { createTheme } from "@material-ui/core"
import { green } from "@material-ui/core/colors"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F3964A"
    },
    secondary: {
      main: green[100]
    },
    gradient: {
      start: "#AA5418",
      end: "#F6C744"
    },
    waveGradient: {
      start: "#F6C744",
      end: "#F68F44"
    },
    lightGradient: {
      start: "#FFFFFF",
      end: "#FFE3E3"
    }
  },
  typography: {
    fontFamily: "Poppins, Roboto, sans-serif"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: 450,
      tablet: 800,
      desktop: 1200
    }
  }
})
