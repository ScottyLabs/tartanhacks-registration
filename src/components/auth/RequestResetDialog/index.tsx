import {
  Collapse,
  LinearProgress,
  Snackbar,
  TextField,
  Typography
} from "@mui/material"
import { Alert } from "@mui/material"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../../design/RectangleButton"
import NextLink from "next/link"
import styles from "./index.module.scss"

const RequestResetDialog = (): ReactElement => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [sentEmail, setSentEmail] = useState(false)

  const errorMessage = useSelector((state: RootState) => state?.accounts?.error)

  const sendResetEmail = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.requestReset(email))
      setSentEmail(true)
    } catch (err) {
      setError(true)
    }
    setLoading(false)
  }

  const resetForm = (
    <form
      className={styles.resetForm}
      onSubmit={(e) => {
        e.preventDefault()

        sendResetEmail()
      }}
    >
      <TextField
        required
        name="email"
        size="medium"
        label="Email"
        variant="outlined"
        fullWidth={true}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />
      <RectangleButton type="submit">Reset</RectangleButton>
    </form>
  )

  const sentEmailMessage = (
    <>
      <Typography variant="body1">
        A password reset email has been sent to
        <span className={styles.emailLabel}> {email}</span>.
      </Typography>
      <Typography variant="body1">
        Click the link in your email to proceed.
      </Typography>
    </>
  )

  return (
    <div className={styles.dialog}>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <div className={styles.dialogContent}>
        <Typography variant="h4" className={styles.header}>
          Account Recovery
        </Typography>
        {sentEmail ? sentEmailMessage : resetForm}

        <NextLink href="/login" passHref>
          <a className={styles.link}>Return to login</a>
        </NextLink>
      </div>
    </div>
  )
}

export default RequestResetDialog
