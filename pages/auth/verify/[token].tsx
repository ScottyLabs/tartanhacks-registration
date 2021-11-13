import { Button, makeStyles, Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import { DialogLayout } from "src/layouts"

const useStyles = makeStyles((theme) => ({
  failure: {
    border: "solid #D8000C 1px",
    background: "#FFBABA"
  },

  success: {
    border: "solid #04AA6D 1px",
    background: "#DFF2BF"
  },

  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    borderRadius: "1em",
    padding: "1em",
    margin: "0 auto",
    flexDirection: "column"
  }
}))

const Verification = () => {
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
        setVerificationStatus("ERROR")
      } finally {
        setLoading(false)
      }
    }

    verify()
  }, [token])

  const failure = () => {
    return (
      <div className={`${classes.dialog} ${classes.failure}`}>
        <Typography variant="h4">This is an invalid token</Typography>
        <Typography variant="body1">Please request a new one</Typography>
      </div>
    )
  }

  const success = () => {
    return (
      <div className={`${classes.dialog} ${classes.success}`}>
        <Typography variant="h4">You are verified!</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/")
          }}
        >
          Back to login
        </Button>
      </div>
    )
  }

  const expired = () => {
    return (
      <div className={`${classes.dialog}, ${classes.failure}`}>
        <Typography variant="h4">This token has expired</Typography>
        <Typography variant="body1">Please request a new one</Typography>
      </div>
    )
  }

  if (loading) {
    return <></>
  }

  if (verificationStatus === "SUCCESS") {
    return success()
  }

  if (verificationStatus === "EXPIRED") {
    return expired()
  }

  return failure()
}

export default DialogLayout(Verification)
