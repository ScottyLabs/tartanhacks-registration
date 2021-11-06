import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { Ethnicity, Gender } from "enums/Profile"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em"
  },
  sectionHeader: {
    marginBottom: "1rem"
  }
}))

const BasicSection = ({
  validate,
  setValidate,
  setValid
}: {
  validate: boolean
  setValidate: Dispatch<SetStateAction<boolean>>
  setValid: Dispatch<SetStateAction<boolean>>
}): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  // Basic information
  const [displayName, setDisplayName] = useState<string>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [gender, setGender] = useState<Gender | null>()
  const [genderOther, setGenderOther] = useState<string>()
  const [ethnicity, setEthnicity] = useState<Ethnicity | null>()
  const [ethnicityOther, setEthnicityOther] = useState<string>()

  // Error fields
  const [displayNameErrorStatus, setDisplayNameErrorStatus] = useState(false)
  const [firstNameErrorStatus, setFirstNameErrorStatus] = useState(false)
  const [lastNameErrorStatus, setLastNameErrorStatus] = useState(false)
  const [genderErrorStatus, setGenderErrorStatus] = useState(false)
  const [ethnicityErrorStatus, setEthnicityErrorStatus] = useState(false)

  // Error message fields
  const [displayNameHelper, setDisplayNameHelper] = useState<string>(
    "Your display name is used in your leaderboard ranking"
  )
  const [firstNameHelper, setFirstNameHelper] = useState<string>("")
  const [lastNameHelper, setLastNameHelper] = useState<string>("")
  const [genderHelper, setGenderHelper] = useState<string>("")
  const [ethnicityHelper, setEthnicityHelper] = useState<string>("")

  const validateForm = () => {
    if (!displayName || displayName === "") {
      // TODO: check if display name is available
      setDisplayNameErrorStatus(true)
      setDisplayNameHelper("Missing display name")
    } else if (displayName === "hello") {
      setDisplayNameErrorStatus(true)
      setDisplayNameHelper("That display name is taken!")
    } else {
      setDisplayNameErrorStatus(false)
      setDisplayNameHelper(
        "Your display name is used in your leaderboard ranking"
      )
    }

    if (
      !(
        displayNameErrorStatus ||
        firstNameErrorStatus ||
        lastNameErrorStatus ||
        genderErrorStatus ||
        ethnicityErrorStatus
      )
    ) {
      setValid(true)
    }

    setValidate(false)
  }

  useEffect(() => {
    if (validate) {
      validateForm()
    }
  }, [validate])

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        BASIC DETAILS
      </Typography>
      <TextField
        label="Display Name"
        variant="outlined"
        error={displayNameErrorStatus}
        helperText={displayNameHelper}
        required
        fullWidth
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value)
        }}
      />
      <TextField
        label="First Name"
        variant="outlined"
        error={firstNameErrorStatus}
        helperText={firstNameHelper}
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
        error={lastNameErrorStatus}
        helperText={lastNameHelper}
        required
        fullWidth
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value)
        }}
      />
      <Autocomplete
        options={Object.values(Gender)}
        error={genderErrorStatus}
        helperText={genderHelper}
        value={gender}
        onChange={(e, value) => setGender(value)}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="Gender" required />
        )}
      />
      {gender === Gender.OTHER ? (
        <TextField
          variant="outlined"
          value={genderOther}
          label="Gender (other)"
          onChange={(e) => setGenderOther(e.target.value)}
        />
      ) : null}
      <Autocomplete
        options={Object.values(Ethnicity)}
        error={ethnicityErrorStatus}
        helperText={ethnicityHelper}
        value={ethnicity}
        onChange={(e, value) => setEthnicity(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Ethnicity"
            required
          />
        )}
      />
      {ethnicity === Ethnicity.OTHER ? (
        <TextField
          variant="outlined"
          value={ethnicityOther}
          label="Ethnicity (other)"
          onChange={(e) => setEthnicityOther(e.target.value)}
        />
      ) : null}
    </div>
  )
}

export default BasicSection
