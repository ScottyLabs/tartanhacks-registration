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
              x1="720"
              y1="0"
              x2="720"
              y2="465"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.gradientStart} />
              <stop offset="1" className={styles.gradientStop} />
            </linearGradient>
          </defs>
        </svg>
        <svg
          width="391"
          height="436"
          viewBox="0 0 391 436"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.strokeLeft}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-13.5212 81.7144L289.031 157.863L214.101 2.28059L388.043 31.5697L379.039 85.0404L308.416 73.1486L388.16 238.727L149.238 178.594L268.261 308.018L186.392 352.434L278.318 382.3L261.563 433.87L49.5469 364.988L181.267 293.526L-13.5212 81.7144Z"
            fill="#FF7AA5"
            stroke="#1028F1"
            strokeWidth="3.05691"
          />
        </svg>
        <svg
          width="317"
          height="435"
          viewBox="0 0 317 435"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.strokeRight}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M130.367 77.7911C93.8439 69.612 56.4766 78.3422 34.0071 88.9837L3.19959 23.9339C36.573 8.1283 90.4314 -4.91109 146.096 7.55452C204.153 20.5558 259.848 60.4318 293.965 142.284C328.082 224.136 317.196 291.763 285.56 342.15C255.227 390.46 208.052 419.533 173.332 432.109L148.819 364.436C172.195 355.969 204.701 335.575 224.603 303.877C243.201 274.255 253.103 231.333 227.528 169.975C201.954 108.617 164.498 85.4345 130.367 77.7911Z"
            fill="#735FFF"
            stroke="#1D34FC"
            strokeWidth="4"
          />
        </svg>
      </div>
    </>
  )
}

export default WaveBackground
