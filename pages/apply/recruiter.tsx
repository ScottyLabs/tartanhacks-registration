import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { 
  ReactElement,
 } from "react"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import RecruiterApplicationForm from "src/components/form/RecruiterApplicationForm"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout, AdminLayout } from "src/layouts"

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

const RecruiterApplicationPage: NextPage = (): ReactElement => {
  const classes = useStyles()

  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={classes.background}>
          <RecruiterApplicationForm />
        </div>
      </div>
    </>
  )
}

export default AdminLayout(AuthenticatedLayout(RecruiterApplicationPage))
