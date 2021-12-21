import {
  Button,
  makeStyles,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert, Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import { ObjectId } from "mongodb"

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: "60%",
    padding: "2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "3em",
    zIndex: 5,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.lightGradient.start} 0%, ${theme.palette.lightGradient.end} 189%)`,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "80%",
      marginTop: "10%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%",
      marginTop: "20%"
    }
  },
  applicationForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  headerContainer: {
    width: "40%",
    textAlign: "center",
    alignSelf: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  header: {
    borderBottom: `solid ${theme.palette.text.primary} 2px`,
    paddingBottom: "1rem",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "1.8em"
    }
  },
  formContents: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    gap: "2em"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}))

interface Sponsor {
  name: string
  _id: ObjectId
}

const RecruiterApplicationForm = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  const sponsors: Sponsor[] =
    useSelector((state: RootState) => state.sponsors.data) || []
  const [sponsorSelection, setSponsorSelection] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const checkSponsor = () => {
    if (sponsorSelection != "") {
      if (errorMessage === "Sponsor not selected") {
        setError(false)
        setErrorMessage("")
      }
      return true
    }
    else {
      setError(true)
      setErrorMessage("Sponsor not selected")
      return false
    }
  }

  const checkEmail = () => {
    if (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(email)) {
      if (errorMessage === "Invalid email") {
        setError(false)
        setErrorMessage("")
      }
      return true
    }
    else {
      setError(true)
      setErrorMessage("Invalid email")
      return false
    }
  }

  const checkFirstName = () => {
    if (firstName != "") {
      if (errorMessage === "Empty first name") {
        setError(false)
        setErrorMessage("")
      }
      return true
    }
    else {
      setError(true)
      setErrorMessage("Empty first name")
      return false
    }
  }

  const checkLastName = () => {
    if (lastName != "") {
      if (errorMessage === "Empty last name") {
        setError(false)
        setErrorMessage("")
      }
      return true
    }
    else {
      setError(true)
      setErrorMessage("Empty last name")
      return false
    }
  }

  const checkFields = () => {
    return checkSponsor() &&
    checkEmail() &&
    checkFirstName() &&
    checkLastName()
  }

  const submitForm = async () => {
    try {
      await dispatch(actions.recruiters.create(
        sponsorSelection,
        email,
        firstName,
        lastName
      ))
    } catch {}
    setEmail("")
    setFirstName("")
    setLastName("")
  }

  useEffect(() => {
    dispatch(actions.sponsors.list())
    // eslint-disable-next-line
  }, [])

  return (
    <Paper className={classes.formDialog}>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <form
        className={classes.applicationForm}
        onSubmit={ async (e) => {
          e.preventDefault()
          console.log(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(email))
          if (checkFields()) {
            console.log("submitting")
            submitForm()
          }
        }}
      >
        <div className={classes.headerContainer}>
          <Typography variant="h3" className={classes.header}>
            Recruiter Application
          </Typography>
        </div>
        <div className={classes.formContents}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            fullWidth
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            fullWidth
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <Autocomplete
            options={sponsors}
            key={"sponsors"}
            getOptionLabel={(option: any) => option.name}
            onChange={(e, selection) =>
              setSponsorSelection(selection ? selection._id.toString() : "")
            }
            renderInput={(params) => (
              <TextField
                variant="outlined"
                {...params}
                label="Sponsor"
                required
              />
            )}
          />
          <div className={classes.buttonContainer}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  )
}

export default RecruiterApplicationForm
