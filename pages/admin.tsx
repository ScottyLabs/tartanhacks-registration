import { NextPage } from "next"
import { ReactElement } from "react"
import AdminDialog from "src/components/admin/AdminDialog"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import WaveHeader from "src/components/design/WaveHeader"
import Menu from "src/components/menu/Menu"
import AdminLayout from "src/layouts/AdminLayout"
import styles from "styles/Home.module.scss"

const AdminPage: NextPage = (): ReactElement => {
  return (
    <>
      <WaveBackground />
      <WaveHeader variant="light" />
      <Menu />
      <div>
        <div className={styles.dialog}>
          <AdminDialog />
        </div>
      </div>
    </>
  )
}

export default AdminLayout(AdminPage)
