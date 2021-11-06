import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { CMUCollege, CollegeLevel, Ethnicity, Gender } from "enums/Profile"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch } from "react-redux"
import { getSchools } from "src/util/getSchools"

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

const CMU = "Carnegie Mellon University"

const SchoolSection = ({
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

  // School information
  const [schools, setSchools] = useState<string[]>()
  const [school, setSchool] = useState<string | null>()
  const [college, setCollege] = useState<CMUCollege | null>()
  const [level, setLevel] = useState<CollegeLevel | null>()
  const [graduationYear, setGraduationYear] = useState<string | null>()
  const [major, setMajor] = useState<string>()

  const [collegeErrorStatus, setCollegeErrorStatus] = useState(false)
  const [majorErrorStatus, setMajorErrorStatus] = useState(false)

  useEffect(() => {
    const querySchools = async () => {
      const schoolsList = await getSchools()
      setSchools(schoolsList)
    }
    querySchools()
  }, [])

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        School Information
      </Typography>
      <Autocomplete
        options={schools as string[]}
        value={school}
        onChange={(e, value) => setSchool(value)}
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="School" required />
        )}
      />
      {school === CMU ? (
        <Autocomplete
          options={Object.values(CMUCollege)}
          value={college}
          onChange={(e, value) => setCollege(value)}
          renderInput={(params) => (
            <TextField
              variant="outlined"
              {...params}
              label="College (CMU)"
              required
            />
          )}
        />
      ) : null}
      <Autocomplete
        options={Object.values(CollegeLevel)}
        value={level}
        onChange={(e, value) => setLevel(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Year Level"
            required
          />
        )}
      />
      <Autocomplete
        options={["2022", "2023", "2024", "2025", "2026", "2027"]}
        value={graduationYear}
        onChange={(e, value) => setGraduationYear(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Graduation Year"
            required
          />
        )}
      />
      <TextField
        label="Major"
        variant="outlined"
        fullWidth
        value={major}
        onChange={(e) => {
          setMajor(e.target.value)
        }}
      />
    </div>
  )
}

export default SchoolSection
