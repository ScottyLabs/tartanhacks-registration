import React, { ReactElement, FunctionComponent } from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))

/**
 * A basic centered layout containing a dialog centered to the middle of the page
 */
const DialogLayout = (Page: FunctionComponent) => (): ReactElement => {
  const classes = useStyles({})

  return (
    <>
      <div className={classes.root}>
        <Page />
      </div>
    </>
  )
}

export default DialogLayout
