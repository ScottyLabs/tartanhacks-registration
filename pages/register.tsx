import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement, useEffect } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import WaveHeader from "src/components/design/WaveHeader"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import { deleteCookie } from "cookies-next"

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

const RegisterPage: NextPage = (): ReactElement => {
  const classes = useStyles()

  useEffect(() => {
    window.localStorage.removeItem("accessToken")
    deleteCookie("accessToken")
  }, [])
  return (
    <div>
      <WaveHeader />
      <div className={classes.scottyContainer}>
        <ScottyLabsIcon className={classes.scottyIcon} />
      </div>
      <div className={classes.dialog}>
        <AuthenticationDialog registration={true} />
      </div>
    </div>
  )
}

export default RegisterPage
