import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { Ethnicity, Gender } from "enums/Profile"
import React, { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"

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

const BasicSection = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  // Basic information
  const [displayName, setDisplayName] = useState<string>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [gender, setGender] = useState<Gender | null>()
  const [genderOther, setGenderOther] = useState<string>()
  const [ethnicity, setEthnicity] = useState<Ethnicity>()
  const [ethnicityOther, setEthnicityOther] = useState<string>()

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        BASIC DETAILS
      </Typography>
      <TextField
        label="Display Name"
        variant="outlined"
        helperText="Your display name is used when participating in the leaderboard"
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
