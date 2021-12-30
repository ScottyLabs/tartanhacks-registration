import {
  Collapse,
  LinearProgress,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/dist/client/router"
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
  },
  emailLabel: {
    fontWeight: "bold"
  }
}))

const RequestResetDialog = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const classes = useStyles(theme)
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
      className={classes.resetForm}
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
        <span className={classes.emailLabel}> {email}</span>.
      </Typography>
      <Typography variant="body1">
        Click the link in your email to proceed.
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
          Account Recovery
        </Typography>
        {sentEmail ? sentEmailMessage : resetForm}
      </div>
    </div>
  )
}

export default RequestResetDialog
