import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement, useEffect } from "react"
import PasswordResetDialog from "src/components/auth/RequestResetDialog"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import WaveHeader from "src/components/design/WaveHeader"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10em",
    boxSizing: "border-box",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: "3em"
    }
  },
  scottyContainer: {
    zIndex: -1,
    opacity: 0.3,
    bottom: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "end"
  },
  scottyIcon: {
    position: "relative",
    width: "40%",
    bottom: 0,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    }
  }
}))

const ForgotPasswordPage: NextPage = (): ReactElement => {
  const classes = useStyles()

  return (
    <div>
      <WaveHeader />
      <div className={classes.scottyContainer}>
        <ScottyLabsIcon className={classes.scottyIcon} />
      </div>
      <div className={classes.dialog}>
        <PasswordResetDialog />
      </div>
    </div>
  )
}

export default ForgotPasswordPage
