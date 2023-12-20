import {
  Collapse,
  Snackbar,
  TextField,
  Typography,
  Alert,
  LinearProgress
} from "@mui/material"
import AnalyticsEvent from "enums/AnalyticsEvent"
import { useRouter } from "next/dist/client/router"
import NextLink from "next/link"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../../design/RectangleButton"
import styles from "./index.module.scss"
import WaitlistAlert from "src/components/waitlist"

const AuthenticationDialog = ({
  registration = false
}: {
  registration: boolean
}): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const errorMessage = useSelector((state: RootState) => state?.accounts?.error)

  const register = async () => {
    setLoading(true)
    if (password === confirmPassword) {
      setPasswordsMatch(true)
      try {
        await dispatch(actions.auth.register(email, password))
        window.gtag("event", AnalyticsEvent.ACCOUNT_CREATED)
        router.push("/")
      } catch (err) {
        console.error(err)
        setError(true)
      }
    } else {
      setPasswordsMatch(false)
    }
    setLoading(false)
  }
  const login = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.login(email, password))
      router.push("/")
    } catch (err) {
      console.error(err)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dialog}>
        <Snackbar
          open={error || !passwordsMatch}
          autoHideDuration={5000}
          onClose={() => {
            setError(false)
            setPasswordsMatch(true)
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error">
            {error ? errorMessage : "Passwords don't match"}
          </Alert>
        </Snackbar>
        <form
          className={styles.registrationForm}
          onSubmit={(e) => {
            e.preventDefault()

            if (registration) {
              register()
            } else {
              login()
            }
          }}
        >
          <Typography variant="h4" className={styles.header}>
            Welcome
          </Typography>
          <TextField
            required
            name="email"
            size="medium"
            label="Email"
            variant="outlined"
            fullWidth={true}
            value={email}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            required
            type="password"
            name="password"
            size="medium"
            label="Password"
            variant="outlined"
            fullWidth={true}
            value={password}
            disabled={loading}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          {registration ? (
            <TextField
              required
              type="password"
              name="confirm_password"
              size="medium"
              label="Confirm password"
              variant="outlined"
              fullWidth={true}
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
          ) : null}
          <Collapse in={loading}>
            <LinearProgress />
          </Collapse>
          <RectangleButton type="submit">
            {registration ? "Register" : "Login"}
          </RectangleButton>
          <div className={styles.switchAuth}>
            <Typography variant="body1">
              {registration
                ? "Already have an account?"
                : "Don't have an account?"}
            </Typography>
            <NextLink href={registration ? "/login" : "/register"} passHref>
              <a className={styles.link}>
                {registration ? "Log In" : "Sign Up"}
              </a>
            </NextLink>
            {registration ? null : (
              <NextLink href="/forgot-password" passHref>
                <a className={styles.link}>Forgot password</a>
              </NextLink>
            )}
          </div>
        </form>
      </div>
      <div className={styles.warning}>
            <WaitlistAlert completedProfile={false}/>
      </div>
      <Alert severity="info" className={styles.warning}>
        TartanHacks 2023 will be completely in-person!
      </Alert>
      <Alert severity="warning" className={styles.warning}>
        Participants must be undergraduates and at least 18 years old
      </Alert>
    </div>
  )
}

export default AuthenticationDialog
