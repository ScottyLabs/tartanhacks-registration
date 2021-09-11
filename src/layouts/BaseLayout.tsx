import React, { ReactElement, FunctionComponent } from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    // add root styles
  },
}))

const BaseLayout = (Page: FunctionComponent) => (): ReactElement => {
  const classes = useStyles({})

  return (
    <>
      <div className={classes.root}>
        <Page />
      </div>
    </>
  )
}

export default BaseLayout
