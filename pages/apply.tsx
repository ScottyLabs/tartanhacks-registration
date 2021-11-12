import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import WaveBackground from "src/components/design/WaveBackground"
import ApplicationForm from "src/components/form/ApplicationForm"
import { AuthenticatedLayout } from "src/layouts"

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "10em",
    boxSizing: "border-box",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: "3em"
    }
  }
}))

const ApplicationPage: NextPage = (): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <WaveBackground />
      <div>
        <div className={classes.background}>
          <ApplicationForm />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedLayout(ApplicationPage)
