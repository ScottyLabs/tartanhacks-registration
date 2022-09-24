import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import {
  CMUCollege,
  CollegeLevel,
  GraduationYear,
  GraduationYears
} from "enums/Profile"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { getSchools } from "src/util/getSchools"
import { SchoolFields } from "types/ApplicationForm"
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

const CMU = "Carnegie Mellon University"

const SchoolSection = ({
  validate,
  setValidate,
  setValid,
  setIsCMUStudent
}: {
  validate: boolean
  setValidate: Dispatch<SetStateAction<boolean>>
  setValid: Dispatch<SetStateAction<boolean>>
  setIsCMUStudent: (val: boolean) => void
}): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )
  const schoolFields =
    useSelector((state: RootState) => state?.application?.school) ?? {}

  // School information
  const [schools, setSchools] = useState<string[]>([])
  const [school, setSchool] = useState<string | null>(null)
  const [college, setCollege] = useState<CMUCollege | null>(null)
  const [graduationYear, setGraduationYear] = useState<GraduationYear | null>(
    null
  )
  const [major, setMajor] = useState<string>("")

  const validateForm = async () => {
    const data: SchoolFields = {
      school: school as string,
      graduationYear: graduationYear as string,
      major
    }
    if (school === "Carnegie Mellon University") {
      data.college = college as CMUCollege
    }
    await dispatch(actions.application.saveSchool(data))
    setValid(true)
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
      setSchool(schoolFields.school)
      setCollege(schoolFields.college ?? null)
      setGraduationYear(schoolFields.graduationYear?.toString() ?? null)
      setMajor(schoolFields.major)
      setIsCMUStudent(schoolFields.school == CMU)
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

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
        onChange={(e, value) => {
          setSchool(value)
          setIsCMUStudent(value == CMU)
        }}
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
        options={GraduationYears}
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
        required
        value={major}
        onChange={(e) => {
          setMajor(e.target.value)
        }}
      />
    </div>
  )
}

export default SchoolSection
