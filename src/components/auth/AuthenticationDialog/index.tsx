import {
  CircularProgress, Collapse, makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/dist/client/router"
import NextLink from "next/link"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../../design/RectangleButton"
import styles from "./index.module.scss"

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
    padding: "1em",
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "50%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  registrationForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1em",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      gap: "0.8em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      gap: "0.4em"
    }
  },
  header: {
    fontWeight: 600,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.gradient.start} 19.64%, ${theme.palette.gradient.end} 69.64%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1em"
  },
  switchAuth: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1em"
  },
  link: {
    "&:hover": {
      textDecoration: "none",
      filter: "brightness(85%)"
    }
  },
  warningDiv: {
    background: theme.palette.primary.main,
    marginTop: "2em",
    padding: "10px",
    layout: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    margin: "0 auto",
    borderRadius: "10px",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%",
      marginTop: "0em"
    }
  },
  warning: {
    textAlign: "center",
    color: theme.palette.declined
  },
  wrapper: {
    layout: "flex",
    flexDirection: "column",
    width: "100%"
  }
}))

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
      <div className={styles.warningDiv}>
        <Typography className={styles.warning}>
          Attention! Only{" "}
          <span className={styles.emphasize}>undergraduate</span> participants
          who are at least{" "}
          <span className={styles.emphasize}>18 years old</span> are eligible
          for a prize
        </Typography>
      </div>
    </div>
  )
}

export default AuthenticationDialog
