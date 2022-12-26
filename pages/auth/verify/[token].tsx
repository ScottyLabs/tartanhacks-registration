import { CircularProgress, Collapse, Link, Typography } from "@mui/material"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "src/components/design/RectangleButton"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveBackground from "src/components/design/WaveBackground"
import styles from "styles/Verify.module.scss"

const Verification = (): ReactElement => {
  const dispatch = useDispatch()
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
          <RectangleButton type="button">Back to Home</RectangleButton>
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
  let dialogClass = styles.failure
  if (verificationStatus === "SUCCESS") {
    dialogContent = success
    dialogClass = styles.success
  } else if (verificationStatus === "EXPIRED") {
    dialogContent = expired
  }
  if (loading) {
    dialogClass = styles.loading
  }

  return (
    <>
      <WaveBackground />
      <div>
        <ScottyLabsHeader />
        <div className={styles.dialog}>
          <div className={`${styles.dialogContent} ${dialogClass}`}>
            <Collapse in={loading}>
              <CircularProgress className={styles.spinner} />
            </Collapse>
            <Collapse in={!loading}>
              <div className={styles.dialogText}>{dialogContent}</div>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verification
