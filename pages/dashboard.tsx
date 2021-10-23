import { NextPage } from "next"
import { makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"
import { AuthenticatedLayout, DialogLayout } from "src/layouts"
import DashboardDialog from "src/components/dashboard/DashboardDialog"
import Menu from "src/components/menu/Menu"
import WaveBackground from "src/components/design/WaveBackground"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}))

const DashboardPage: NextPage = (): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <WaveBackground/>
      <Menu/>
      <div className={classes.dialog}>
        <DashboardDialog/>
      </div> 
    </>
  )
}

export default AuthenticatedLayout(DashboardPage)
