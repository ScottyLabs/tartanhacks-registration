import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/dist/client/router"
import { RootState } from "types/RootState"
import { Collapse, CircularProgress, makeStyles } from "@material-ui/core"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"

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
 * Layout to hide content that requires authentication at an admin level.
 * This automatically redirects to the login page if it cannot successfully
 * login the user using the stored login token in the browser
 */
const AdminLayout = (Page: FunctionComponent) => (): ReactElement => {
  const classes = useStyles()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    const loginWithToken = async () => {
      setLoading(true)
      if (currentUser.admin === false) {
        router.push("/")
      }
      setLoading(false)
    }
    loginWithToken()
  }, [currentUser])

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

export default AdminLayout
