import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import ApplicationForm from "src/components/form/ApplicationForm"
import Menu from "src/components/menu/Menu"
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
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={classes.background}>
          <ApplicationForm />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedLayout(ApplicationPage)
