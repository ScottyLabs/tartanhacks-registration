import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useRouter } from "next/dist/client/router"
import { RootState } from "types/RootState"

/**
 * Layout to hide content that requires authentication.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AuthenticatedLayout = (Page: FunctionComponent) => (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
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
    return <></>
  }

  return <Page />
}

export default AuthenticatedLayout
