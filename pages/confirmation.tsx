import { NextPage } from "next"
import React, { ReactElement } from "react"
import { AuthenticatedLayout, DialogLayout } from "src/layouts"
import ConfirmationDialog from "src/components/confirmation/ConfirmationDialog"
import Menu from "src/components/menu/Menu"
import WaveBackground from "src/components/design/WaveBackground"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import styles from "../styles/Confirmation.module.scss"

const ConfirmationPage: NextPage = (): ReactElement => {
  return (
    <>
      <WaveBackground />
      <Menu />
      <div className={styles.dialog}>
        <ScottyLabsHeader />
        <ConfirmationDialog />
      </div>
    </>
  )
}

export default AuthenticatedLayout(ConfirmationPage)
