import { MouseEventHandler, ReactElement } from "react"
import styles from "./index.module.scss"

const BurgerMenu = ({
  className,
  onClick
}: {
  className?: string
  onClick?: MouseEventHandler<SVGSVGElement> | undefined
}): ReactElement => {
  return (
    <svg
      width="70"
      height="45"
      viewBox="0 0 70 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <line
        x1="2.5"
        y1="2.5"
        x2="67.5"
        y2="2.5"
        className={styles.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="2.5"
        y1="22.5"
        x2="67.5"
        y2="22.5"
        className={styles.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="2.5"
        y1="42.5"
        x2="67.5"
        y2="42.5"
        className={styles.line}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default BurgerMenu
