import {
  Button,
  Collapse,
  LinearProgress,
  Link,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/dist/client/router"
import { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    padding: "1em",
    margin: "0 auto",
    textAlign: "center"
  },
  registrationForm: {
    display: "flex",
    flexDirection: "column",
    gap: "1em"
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

  const register = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.register(email, password))
      router.push("/")
    } catch (err) {
      console.error(err)
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
    }
    setLoading(false)
  }

  return (
    <div className={classes.dialog}>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>
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
        <Button
          variant="outlined"
          type="submit"
        >
          {registration ? "Register" : "Login"}
        </Button>
        <div className={classes.switchAuth}>
          <Typography variant="body1">
            {registration
              ? "Already have an account?"
              : "Don't have an account?"}
          </Typography>
          <Link
            className={classes.link}
            href={registration ? "/login" : "/register"}
          >
            {registration ? "Log In" : "Sign Up"}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AuthenticationDialog
