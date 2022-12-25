import { makeStyles } from "@material-ui/core"
import { NextPage } from "next"
import React, { ReactElement } from "react"
import AdminDialog from "src/components/admin/AdminDialog"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import Menu from "src/components/menu/Menu"
import AdminLayout from "src/layouts/AdminLayout"
import styles from "styles/Home.module.scss"

const AdminPage: NextPage = (): ReactElement => {
  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={styles.dialog}>
          <AdminDialog />
        </div>
      </div>
    </>
  )
}

export default AdminLayout(AdminPage)
