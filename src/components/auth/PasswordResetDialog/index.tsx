import {
  Collapse,
  LinearProgress,
  Link,
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
import styles from "./index.module.scss"

const PasswordResetDialog = ({ token }: { token: string }): ReactElement => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [updatedPassword, setUpdatedPassword] = useState(false)

  const errorMessage = useSelector((state: RootState) => state?.accounts?.error)

  const sendResetEmail = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.resetPassword(token, password))
      setUpdatedPassword(true)
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
        name="password"
        type="password"
        size="medium"
        label="New Password"
        variant="outlined"
        fullWidth={true}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <RectangleButton type="submit">Reset</RectangleButton>
    </form>
  )

  const updatedPasswordMessage = (
    <>
      <Typography variant="body1">Your password has been reset!</Typography>
      <Typography variant="body1">
        <Link href="/login">Login</Link> with your new password.
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
          Change Password
        </Typography>
        {updatedPassword ? updatedPasswordMessage : resetForm}
      </div>
    </div>
  )
}

export default PasswordResetDialog
