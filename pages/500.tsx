import React, { ReactElement } from "react"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import Menu from "src/components/menu/Menu"
import styles from "../styles/Apply.module.scss"

export default function Custom500() {
  return (
    <>
      <WaveBackground />
      <Menu />
      <div>
        <ScottyLabsHeader />
        <div className={styles.background}>Server crashed!</div>
      </div>
    </>
  )
}
