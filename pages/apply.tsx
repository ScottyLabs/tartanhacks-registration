import { NextPage } from "next"
import React, { ReactElement } from "react"
import WaveBackground from "src/components/design/WaveBackground"
import ApplicationForm from "src/components/form/ApplicationForm"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"
import styles from "../styles/Apply.module.scss"
import WaveHeader from "src/components/design/WaveHeader"

const ApplicationPage: NextPage = (): ReactElement => {
  return (
    <>
      <WaveBackground />
      <Menu />
      <WaveHeader variant="light" />
      <div>
        <div className={styles.background}>
          <ApplicationForm />
        </div>
      </div>
    </>
  )
}

export default AuthenticatedLayout(ApplicationPage)
