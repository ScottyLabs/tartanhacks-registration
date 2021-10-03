import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useRouter } from "next/dist/client/router"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  root: {
    // add root styles
  }
}))

/**
 * Layout to hide content that requires authentication.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AuthenticatedLayout = (Page: FunctionComponent) => (): ReactElement => {
  const classes = useStyles({})
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  const loginWithToken = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.loginWithToken())
    } catch (err) {
      // Login token expired or invalid
      router.push("/login")
    }
    setLoading(false)
  }

  useEffect(() => {
    loginWithToken()
  }, [])

  if (loading || currentUser == null) {
    return <></>
  }

  return (
    <>
      <div className={classes.root}>
        <Page />
      </div>
    </>
  )
}

export default AuthenticatedLayout
