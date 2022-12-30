import { ReactElement } from "react"
import styles from "./index.module.scss"

const WaveFooter = (): ReactElement => {
  return (
    <>
      <div className={styles.waveContainer}>
        <svg
          width="1440"
          height="465"
          viewBox="0 0 1440 465"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.waveSvg}
        >
          <path
            d="M0 110.433C102.924 53.6918 304.348 55.6107 777.391 55.6107C1193.04 55.6107 1322.46 54.8729 1440 0V465H0V110.433Z"
            fill="url(#paint0_linear_384:274)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_384:274"
              x1="720"
              y1="0"
              x2="720"
              y2="465"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.gradientEnd} />
              <stop
                className={styles.gradientStart}
                offset="1"
                stopOpacity="0.53"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default WaveFooter
