import { NextPage } from "next"
import React, { ReactElement } from "react"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import ApplicationForm from "src/components/form/ApplicationForm"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"
import styles from "../styles/Apply.module.scss"

const ApplicationPage: NextPage = (): ReactElement => {
  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={styles.background}>
          <ApplicationForm />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedLayout(ApplicationPage)
