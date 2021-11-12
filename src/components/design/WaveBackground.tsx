import { makeStyles, Typography, useTheme } from "@material-ui/core"
import React, { ReactElement } from "react"
import ScottyLabsSmallLogo from "./ScottyLabsSmallIcon"

const useStyles = makeStyles((theme) => ({
  waveContainer: {
    position: "fixed",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0
  },
  titleBox: {
    position: "absolute",
    marginLeft: "2em",
    marginTop: "2em",
    display: "flex",
    flexDirection: "row"
  },
  title: {
    bottom: "0",
    zIndex: 1,
    color: `${theme.palette.primary.main}`,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      marginLeft: "0.5em",
      marginTop: "0.5em",
      fontSize: "5em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      marginLeft: "0.7em",
      marginTop: "0.7em",
      fontSize: "3em"
    }
  },
  waveSvg: {
    position: "absolute",
    width: "100%",
    height: "465px",
    bottom: "0",
    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      height: "15em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      height: "10em"
    }
  },
  scottyIcon: {
    position: "relative",
    width: "75px",
    height: "65px",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    },
    marginRight: "1em"
  }
}))

const WaveBackground = (): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <>
      <div className={classes.waveContainer}>
        <div className={classes.titleBox}>
          <ScottyLabsSmallLogo className={classes.scottyIcon} />
          <Typography variant="h2" className={classes.title}>
            Tartanhacks Scottylabs
          </Typography>
        </div>
        <svg
          className={classes.waveSvg}
          viewBox="0 0 1440 465"
          preserveAspectRatio="none"
        >
          <path
            d="M0 110.433C102.924 53.6918 304.348 55.6107 777.391 55.6107C1193.04 55.6107 1322.46 54.8729 1440 0V465H0V110.433Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="720"
              y1="0"
              x2="720"
              y2="465"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor={theme.palette.waveGradient.start} />
              <stop
                offset="1"
                stopColor={theme.palette.waveGradient.end}
                stopOpacity="0.53"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default WaveBackground
