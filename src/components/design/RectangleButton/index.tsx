import { Button } from "@mui/material"
import React, { ReactElement } from "react"
import styles from "./index.module.scss"

const RectangleButton = ({
  className,
  children,
  type,
  onClick,
  startIcon,
  backgroundColor
}: {
  className?: string
  children?: ReactElement | string
  type: "button" | "reset" | "submit" | undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  startIcon?: ReactElement
  backgroundColor?: string
}): ReactElement => {
  return (
    <>
      <Button
        variant="contained"
        type={type}
        className={`${className} ${styles.button}`}
        onClick={onClick}
        startIcon={startIcon}
        style={{ backgroundColor }}
      >
        {children}
      </Button>
    </>
  )
}

export default RectangleButton
