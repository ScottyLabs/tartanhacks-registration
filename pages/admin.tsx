import { NextPage } from "next"
import { makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"
import { AuthenticatedLayout, DialogLayout } from "src/layouts"
import AdminDialog from "src/components/admin/AdminDialog"
import Menu from "src/components/menu/Menu"
import WaveBackground from "src/components/design/WaveBackground"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))

const AdminPage: NextPage = (): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={classes.dialog}>
          <AdminDialog />
        </div>
      </div>
    </>
  )
}

export default AdminPage
