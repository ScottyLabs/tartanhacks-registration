import { Button, makeStyles } from "@material-ui/core"
import React, { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#F7C062",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)",
    color: "white"
  }
}))

const RectangleButton = ({
  className,
  children,
  type
}: {
  className?: string
  children?: ReactElement | string
  type: "button" | "reset" | "submit" | undefined
}): ReactElement => {
  const classes = useStyles()
  return (
    <>
      <Button
        variant="contained"
        type={type}
        className={`${className} ${classes.button}`}
      >
        {children}
      </Button>
    </>
  )
}

export default RectangleButton
