import {
  Collapse,
  CircularProgress,
  Link,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/dist/client/router"
import NextLink from "next/link"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../design/RectangleButton"

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
  const theme = useTheme()
  const router = useRouter()
  const classes = useStyles(theme)
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
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <Snackbar
          open={error}
          autoHideDuration={5000}
          onClose={(e) => setError(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
        <form
          className={classes.registrationForm}
          onSubmit={(e) => {
            e.preventDefault()

            if (registration) {
              register()
            } else {
              login()
            }
          }}
        >
          <Typography variant="h4" className={classes.header}>
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
          <div className={classes.switchAuth}>
            <Typography variant="body1">
              {registration
                ? "Already have an account?"
                : "Don't have an account?"}
            </Typography>
            <NextLink href={registration ? "/login" : "/register"} passHref>
              <Link className={classes.link}>
                {registration ? "Log In" : "Sign Up"}
              </Link>
            </NextLink>
            {registration ? null : (
              <NextLink href="/forgot-password" passHref>
                <Link>Forgot password</Link>
              </NextLink>
            )}
          </div>
        </form>
      </div>
      <div className={classes.warningDiv}>
        <Typography className={classes.warning}>
          Attention! Only undergraduate participants who are at least 18 years
          old are eligible for a prize
        </Typography>
      </div>
    </div>
  )
}

export default AuthenticationDialog
