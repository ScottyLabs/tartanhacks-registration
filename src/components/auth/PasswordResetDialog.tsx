import {
  Collapse,
  LinearProgress,
  Link,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../design/RectangleButton"

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    padding: "1em",
    textAlign: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "50%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  resetForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    width: "100%"
  },
  header: {
    fontWeight: 600,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.gradient.start} 19.64%, ${theme.palette.gradient.end} 69.64%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1em"
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-10em",
    color: theme.palette.gradient.start
  }
}))

const PasswordResetDialog = ({ token }: { token: string }): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
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
      className={classes.resetForm}
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
    <div className={classes.dialog}>
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
      <div className={classes.dialogContent}>
        <Typography variant="h4" className={classes.header}>
          Change Password
        </Typography>
        {updatedPassword ? updatedPasswordMessage : resetForm}
      </div>
    </div>
  )
}

export default PasswordResetDialog
