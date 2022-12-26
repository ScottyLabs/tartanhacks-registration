import {
  CircularProgress,
  Collapse,
  Snackbar,
  TextField,
  Typography,
  Alert
} from "@mui/material"
import { useRouter } from "next/dist/client/router"
import NextLink from "next/link"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../../design/RectangleButton"
import styles from "./index.module.scss"

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

  const errorMessage = useSelector((state: RootState) => state?.accounts?.error)

  const register = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.register(email, password))
      router.push("/")
    } catch (err) {
      console.error(err)
      setError(true)
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
          open={error}
          autoHideDuration={5000}
          onClose={(e) => setError(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error">{errorMessage}</Alert>
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
          <Collapse in={loading}>
            <CircularProgress />
          </Collapse>
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
          <TextField
            required
            type="password"
            name="password"
            size="medium"
            label="Password"
            variant="outlined"
            fullWidth={true}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
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
      <Alert severity="warning" className={styles.warning}>
        Participants must be undergraduates and least 18 years old!
      </Alert>
      <Alert severity="warning" className={styles.warning}>
        TartanHacks 2023 will be completely in-person!
      </Alert>
    </div>
  )
}

export default AuthenticationDialog
