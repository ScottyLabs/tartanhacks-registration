import {
  CircularProgress,
  Collapse,
  makeStyles,
  Typography
} from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    marginBottom: "5em"
  }
}))

/**
 * Layout to hide content that requires authentication.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AuthenticatedLayout = (Page: FunctionComponent) => (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    const loginWithToken = async () => {
      setLoading(true)
      try {
        await dispatch(actions.auth.loginWithToken())
        dispatch(actions.user.getStatus(currentUser._id))
        dispatch(actions.settings.getCloseTime())
        dispatch(actions.settings.getConfirmTime())
      } catch (err) {
        // Login token expired or invalid
        router.push("/login")
      }
      setLoading(false)
    }
    loginWithToken()
  }, [])

  if (loading || currentUser == null) {
    return (
      <>
        <WaveBackground />
        <div>
          <ScottyLabsHeader />
          <div className={classes.dialog}>
            <Collapse in={loading}>
              <CircularProgress className={classes.spinner} />
            </Collapse>
          </div>
        </div>
      </>
    )
  }

  return <Page />
}

export default AuthenticatedLayout
