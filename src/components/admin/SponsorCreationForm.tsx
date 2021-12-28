import {
  Button,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { ObjectId } from "mongodb"
import React, { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  applicationForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  headerContainer: {
    textAlign: "center",
    alignSelf: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    },
    paddingBottom: "0.5rem"
  },
  header: {
    borderBottom: `solid ${theme.palette.text.primary} 2px`,
    paddingBottom: "0.5rem",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "1.8em"
    },
    color: theme.palette.text.primary,
    fontWeight: 600
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

const SponsorCreationForm = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  const [sponsors, setSponsors] = useState("")

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const createSponsors = async () => {
    setLoading(true)
    try {
      const lines = sponsors.split("\n").filter((line) => line != "")
      if (lines.length == 0) {
        setError(true)
        setErrorMessage("Please enter at least one sponsor!")
      } else {
        for (const sponsorName of lines) {
          setSuccess(false)
          await dispatch(actions.sponsors.create(sponsorName))
          setSuccessMessage("Created sponsor: " + sponsorName)
          setSuccess(true)
        }
      }
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.data)
    }
    setLoading(false)
  }

  return (
    <div className={classes.container}>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={(e) => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <form
        className={classes.applicationForm}
        onSubmit={async (e) => {
          e.preventDefault()
          createSponsors()
        }}
      >
        <div className={classes.headerContainer}>
          <Typography variant="h4" className={classes.header}>
            Create Sponsor
          </Typography>
        </div>
        <div className={classes.formContents}>
          <Typography variant="body2">
            If creating multiple sponsors (companies) at once, put each company
            name on a new line
          </Typography>
          <TextField
            label="Sponsors"
            multiline
            minRows={4}
            value={sponsors}
            onChange={(e) => setSponsors(e.target.value)}
          />
          <div className={classes.buttonContainer}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SponsorCreationForm
