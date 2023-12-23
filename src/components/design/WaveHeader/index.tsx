import { Link } from "@mui/material"
import NextLink from "next/link"
import { ReactElement } from "react"
import Text from "../Text"
import styles from "./index.module.scss"
import ScottyLabsIcon from "../ScottyLabsIcon"

const WaveHeader = (): ReactElement => {
  return (
    <>
      <div className={styles.waveContainer}>
        <div className={styles.headerAssets}>
          <div className={styles.link}>
            <NextLink href="/" passHref>
              <Link>
                <Text variant="h1" className={styles.title}>
                  TartanHacks
                </Text>
                <Text variant="h2" className={styles.subtitle}>
                  Feb 2-3, 2024
                </Text>
              </Link>
            </NextLink>
          </div>
          <ScottyLabsIcon className={styles.scottyIcon} />
        </div>
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
        >
          <path
            d="M1440 251.445C1337.08 331.37 1135.65 328.667 662.609 328.667C246.957 328.667 117.54 329.706 0 407L5.72619e-05 -248L1440 -248L1440 251.445Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="720"
              y1="407"
              x2="720"
              y2="-248"
              gradientUnits="userSpaceOnUse"
            >
              <stop className={styles.waveSvgStart} />
              <stop className={styles.waveSvgEnd} offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  )
}

export default WaveHeader
