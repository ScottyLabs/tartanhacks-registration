import { makeStyles, Typography, useTheme } from "@material-ui/core"
import React, { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  waveContainer: {
    position: "fixed",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    bottom: "0px"
  },
  waveSvg: {
    width: "100%",
    height: "465px",
    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      height: "15em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      height: "10em"
    }
  }
}))

const WaveFooter = (): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <div className={classes.waveContainer}>
        <svg width="1440" height="465" viewBox="0 0 1440 465" fill="none" preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg" className={classes.waveSvg}>
          <path d="M0 110.433C102.924 53.6918 304.348 55.6107 777.391 55.6107C1193.04 55.6107 1322.46 54.8729 1440 0V465H0V110.433Z" fill="url(#paint0_linear_384:274)" />
          <defs>
            <linearGradient id="paint0_linear_384:274" x1="720" y1="0" x2="720" y2="465" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F6C744" />
              <stop offset="1" stopColor="#F68F44" stopOpacity="0.53" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default WaveFooter
