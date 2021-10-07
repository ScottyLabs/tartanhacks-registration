import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import AuthenticationDialog from "src/components/auth/AuthenticationDialog"
import Wave from "src/components/design/Wave"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))

const LoginPage: NextPage = (): ReactElement => {
  const classes = useStyles({})
  return (
    <div>
      <Wave />
      <div className={classes.root}>
        <AuthenticationDialog registration={false} />
      </div>
    </div>
  )
}

export default LoginPage
