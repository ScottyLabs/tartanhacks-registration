import { NextPage } from "next"
import { ReactElement } from "react"
import DashboardDialog from "src/components/dashboard/DashboardDialog"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import WaveHeader from "src/components/design/WaveHeader"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"
import styles from "styles/Home.module.scss"

const Home: NextPage = (): ReactElement => (
  <>
    <WaveBackground />
    <Menu />
    <WaveHeader variant="light" />
    <div>
      <div className={styles.dialog}>
        <DashboardDialog />
      </div>
    </div>
  </>
)

export default AuthenticatedLayout(Home)
