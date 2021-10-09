/**
 * Augment the Material-UI styles type to support
 * our custom additional colors in the theme
 */
declare module "@material-ui/core/styles/createPalette" {
  interface PaletteOptions {
    gradient?: {
      start: string
      end: string
    }
    waveGradient?: {
      start: string
      end: string
    }
    lightGradient?: {
      start: string
      end: string
    }
  }

  interface Palette {
    gradient: {
      start: string
      end: string
    }
    waveGradient: {
      start: string
      end: string
    }
    lightGradient: {
      start: string
      end: string
    }
  }
}

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    mobile: true
    tablet: true
    desktop: true
  }
}

export {}
