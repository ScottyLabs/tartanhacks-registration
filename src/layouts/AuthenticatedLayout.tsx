import { CircularProgress, Collapse } from "@mui/material"
import { useRouter } from "next/dist/client/router"
import { FunctionComponent, ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

/**
 * Layout to hide content that requires authentication.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AuthenticatedLayout = (Page: FunctionComponent) => (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loadingLogin, setLoadingLogin] = useState(true)
  const [loadingTime, setLoadingTime] = useState(true)
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    const loginWithToken = async () => {
      setLoadingLogin(true)
      try {
        await dispatch(actions.auth.loginWithToken())
      } catch (err) {
        // Login token expired or invalid
        router.push("/login")
      }
      setLoadingLogin(false)
    }
    loginWithToken()
  }, [])

  useEffect(() => {
    const getData = async () => {
      setLoadingTime(true)
      try {
        dispatch(actions.settings.getCloseTime())
        dispatch(actions.settings.getConfirmTime())
      } catch (err) {
        console.error(err)
      }
      setLoadingTime(false)
    }
    if (currentUser?._id != null) {
      getData()
    }
  }, [currentUser])

  if (loadingLogin || loadingTime || currentUser == null) {
    return (
      <>
        <WaveBackground />
        <div>
          <ScottyLabsHeader />
          <div className={styles.dialog}>
            <Collapse in={loadingLogin}>
              <CircularProgress className={styles.spinner} />
            </Collapse>
          </div>
        </div>
      </>
    )
  }

  return <Page />
}

export default AuthenticatedLayout
