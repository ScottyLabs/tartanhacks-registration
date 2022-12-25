import { Button, Snackbar, TextField, Typography } from "@mui/material"
import { Alert } from "@mui/material"
import { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import styles from "./index.module.scss"

const SponsorCreationForm = (): ReactElement => {
  const dispatch = useDispatch()

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
    <div className={styles.container}>
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
        className={styles.applicationForm}
        onSubmit={async (e) => {
          e.preventDefault()
          createSponsors()
        }}
      >
        <div className={styles.headerContainer}>
          <Typography variant="h4" className={styles.header}>
            Create Sponsor
          </Typography>
        </div>
        <div className={styles.formContents}>
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
          <div className={styles.buttonContainer}>
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
