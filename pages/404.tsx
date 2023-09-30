import { NextPage } from "next"
import React, { ReactElement } from "react"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import ApplicationForm from "src/components/form/ApplicationForm"
import Menu from "src/components/menu/Menu"
import styles from "../styles/404.module.scss"

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

export default function Custom404() {
  return (
    <>
      <WaveBackground />
      <div>
        <ScottyLabsHeader />
        <div className={styles.background}>
          <h1> 404 - Page Not Found </h1>
        </div>
      </div>
    </>
  )
}
