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
import { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  dialog: {
    border: "solid black 1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    borderRadius: "1em",
    padding: "1em",
    margin: "0 auto"
  },
  registrationForm: {
    display: "flex",
    flexDirection: "column"
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

const AuthenticationDialog = ({ registration = false }): ReactElement => {
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
      const { data } = await dispatch(actions.auth.register(email, password))
      console.log("Registered user", data)
      router.push("/")
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }
  const login = async () => {
    setLoading(true)
    try {
      const { data } = await dispatch(actions.auth.login(email, password))
      console.log("Logged in", data)
      router.push("/")
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    dispatch(actions.auth.login())
  }, [])

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
        <Typography variant="h4">TartanHacks 2021</Typography>
        <TextField
          required
          name="email"
          size="small"
          margin="dense"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <TextField
          required
          type="password"
          name="password"
          size="small"
          margin="dense"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            if (registration) {
              register()
            } else {
              login()
            }
          }}
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
