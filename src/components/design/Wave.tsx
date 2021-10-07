import { makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  waveContainer: {
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    lineHeight: 0
  },
  waveSvg: {
    position: "relative",
    width: "100%",
    height: "300px",
    filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))"
  }
}))

const Wave = (): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.waveContainer}>
        <svg
          className={classes.waveSvg}
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
        >
          <path
            d="M1440 251.445C1337.08 331.37 1135.65 328.667 662.609 328.667C246.957 328.667 117.54 329.706 0 407L5.72619e-05 -248L1440 -248L1440 251.445Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="720"
              y1="407"
              x2="720"
              y2="-248"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F6C744" />
              <stop offset="1" stop-color="#F68F44" stop-opacity="0.88" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default Wave
