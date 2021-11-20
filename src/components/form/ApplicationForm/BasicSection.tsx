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
import { BasicFields } from "types/ApplicationForm"
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

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )
  const basicFields =
    useSelector((state: RootState) => state?.application?.basic) ?? {}

  // Basic information
  const [displayName, setDisplayName] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [gender, setGender] = useState<Gender | null>(null)
  const [genderOther, setGenderOther] = useState<string>("")
  const [ethnicity, setEthnicity] = useState<Ethnicity | null>(null)
  const [ethnicityOther, setEthnicityOther] = useState<string>("")

  // Error fields
  const [displayNameErrorStatus, setDisplayNameErrorStatus] = useState(false)
  const [displayNameHelper, setDisplayNameHelper] = useState<string>(
    "Your display name is used in your leaderboard ranking"
  )

  const validateForm = async () => {
    let valid = true
    const { data: displayNameAvailable } = await dispatch(
      actions.application.checkDisplayName(displayName)
    )
    if (!displayNameAvailable) {
      setDisplayNameErrorStatus(true)
      setDisplayNameHelper(
        "That display name is taken. Please choose something else"
      )
      valid = false
    } else {
      setDisplayNameErrorStatus(false)
      setDisplayNameHelper(
        "Your display name is used in your leaderboard ranking"
      )
    }

    if (valid) {
      const data: BasicFields = {
        displayName,
        firstName,
        lastName,
        gender: gender as Gender,
        ethnicity: ethnicity as Ethnicity
      }
      if (gender === Gender.OTHER) {
        data.genderOther = genderOther
      }
      if (ethnicity == Ethnicity.OTHER) {
        data.ethnicityOther = ethnicityOther
      }
      await dispatch(actions.application.saveBasic(data))
    }

    setValid(valid)
    setValidate(false)
  }

  useEffect(() => {
    if (validate) {
      validateForm()
    }
  // eslint-disable-next-line
  }, [validate])

  useEffect(() => {
    if (fetchedProfile) {
      setDisplayName(basicFields?.displayName)
      setFirstName(basicFields?.firstName)
      setLastName(basicFields?.lastName)
      setGender(basicFields?.gender)
      setGenderOther(basicFields?.genderOther ?? "")
      setEthnicity(basicFields?.ethnicity)
      setEthnicityOther(basicFields?.ethnicityOther ?? "")
    }
  // eslint-disable-next-line
  }, [fetchedProfile])

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
      <Autocomplete
        options={Object.values(Gender)}
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
