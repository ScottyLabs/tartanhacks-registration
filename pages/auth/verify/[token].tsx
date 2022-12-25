import {
  CircularProgress,
  Collapse,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "src/components/design/RectangleButton"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"

const useStyles = makeStyles((theme) => ({
  failure: {
    border: `solid 3px ${theme.palette.error.main}`
  },
  success: {
    border: `solid 3px ${theme.palette.success.main}`
  },
  loading: {
    border: `solid 3px ${theme.palette.primary.main}`
  },
  dialog: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5
  },
  dialogContent: {
    display: "flex",
    alignItems: "center",
    padding: "2em",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 227, 227, 0.7565) 
    35.13%, rgba(255, 255, 255, 0.85) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    borderRadius: "10px",
    marginTop: "-5em",
    flexDirection: "column"
  },
  dialogText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: {
    marginBottom: "5em"
  }
}))

const Verification = (): ReactElement => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const router = useRouter()
  const { token } = router.query
  const [loading, setLoading] = useState(true)
  const [verificationStatus, setVerificationStatus] = useState("")

  useEffect(() => {
    if (token === undefined) {
      return
    }

    const verify = async () => {
      try {
        const { status } = await dispatch(actions.auth.verify(token as string))
        setVerificationStatus(status)
      } catch (err) {
        setVerificationStatus("SUCCESS")
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [token])

  const failure = (
    <>
      <Typography variant="h4">This is an invalid token</Typography>
      <Typography variant="body1">Please request a new one</Typography>
    </>
  )

  const success = (
    <>
      <Typography variant="h4">You are verified!</Typography>
      <br />
      <NextLink href="/" passHref>
        <Link underline="none">
          <RectangleButton type="button">Back to Login</RectangleButton>
        </Link>
      </NextLink>
    </>
  )

  const expired = (
    <>
      <Typography variant="h4">This token has expired</Typography>
      <Typography variant="body1">Please request a new one</Typography>
    </>
  )

  let dialogContent = failure
  let dialogClass = classes.failure
  if (verificationStatus === "SUCCESS") {
    dialogContent = success
    dialogClass = classes.success
  } else if (verificationStatus === "EXPIRED") {
    dialogContent = expired
  }
  if (loading) {
    dialogClass = classes.loading
  }

  return (
    <>
      <WaveBackground />
      <div>
        <ScottyLabsHeader />
        <div className={classes.dialog}>
          <div className={`${classes.dialogContent} ${dialogClass}`}>
            <Collapse in={loading}>
              <CircularProgress className={classes.spinner} />
            </Collapse>
            <Collapse in={!loading}>
              <div className={classes.dialogText}>{dialogContent}</div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verification
