import React, { ReactElement } from "react"
import styles from "./index.module.scss"

const WaveBackground = (): ReactElement => {
  return (
    <>
      <div className={styles.waveContainer}>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 465"
          preserveAspectRatio="none"
        >
          <path
            d="M0 110.433C102.924 53.6918 304.348 55.6107 777.391 55.6107C1193.04 55.6107 1322.46 54.8729 1440 0V465H0V110.433Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1020"
              y1="0"
              x2="0"
              y2="465"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.gradientStart} />
              <stop offset="1" className={styles.gradientStop} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default WaveBackground
