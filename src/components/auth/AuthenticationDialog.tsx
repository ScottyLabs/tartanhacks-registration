import { ReactElement, useState } from "react"
import axios from "axios"
import {
  Button,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  dialog: {
    border: "solid black 1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    borderRadius: "1em",
    padding: "1em",
    margin: "0 auto",
  },
  registrationForm: {
    display: "flex",
    flexDirection: "column",
  },
  switchAuth: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1em",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
      filter: "brightness(85%)",
    },
  },
}))

const AuthenticationDialog = ({ registration = false }): ReactElement => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = () => {}
  const login = () => {}

  return (
    <div className={classes.dialog}>
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
        <Button variant="outlined">
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
