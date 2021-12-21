import { Button, makeStyles, Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import PasswordResetDialog from "src/components/auth/PasswordResetDialog"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import WaveHeader from "src/components/design/WaveHeader"
import { DialogLayout } from "src/layouts"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10em",
    boxSizing: "border-box",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: "3em"
    }
  },
  scottyContainer: {
    zIndex: -1,
    opacity: 0.3,
    bottom: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "end"
  },
  scottyIcon: {
    position: "relative",
    width: "50%",
    bottom: 0,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    }
  }
}))

const PasswordResetPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const { token } = router.query

  return (
    <div>
      <WaveHeader />
      <div className={classes.scottyContainer}>
        <ScottyLabsIcon className={classes.scottyIcon} />
      </div>
      <div className={classes.dialog}>
        <PasswordResetDialog token={token as string} />
      </div>
    </div>
  )
}

export default PasswordResetPage
