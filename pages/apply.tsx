import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import WaveHeader from "src/components/design/WaveHeader"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import ApplicationForm from "src/components/form/ApplicationForm"

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "10em",
    boxSizing: "border-box",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: "3em"
    },
    backgroundColor: theme.palette.primary.main
  }
}))

const LoginPage: NextPage = (): ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.background}>
        <ApplicationForm />
      </div>
    </div>
  )
}

export default LoginPage
