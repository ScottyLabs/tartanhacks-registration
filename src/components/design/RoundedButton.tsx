import { Button, makeStyles, Typography, useTheme } from "@material-ui/core"
import React, { ReactElement } from "react"

const useStyles = makeStyles((theme) => ({
  button: {
    background: `linear-gradient(316.54deg, ${theme.palette.lightGradient.start} 35.13%, ${theme.palette.lightGradient.end} 126.39%)`,
    borderRadius: "1em",
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)"
  }
}))

const RoundedButton = ({
  className,
  children,
  type
}: {
  className?: string
  children?: ReactElement | string
  type: "button" | "reset" | "submit" | undefined
}): ReactElement => {
  const classes = useStyles()
  const theme = useTheme()
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

export default RoundedButton
