import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import AdminDialog from "src/components/admin/AdminDialog"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import Menu from "src/components/menu/Menu"
import AdminLayout from "src/layouts/AdminLayout"

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

export default AdminLayout(AdminPage)
