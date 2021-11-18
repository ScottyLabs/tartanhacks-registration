import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { HackathonExperience } from "enums/Profile"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { ExperienceFields } from "types/ApplicationForm"
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

const ExperienceSection = ({
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
  const experienceFields =
    useSelector((state: RootState) => state?.application?.experience) ?? {}

  // Experience
  const [coursework, setCoursework] = useState<string>("")
  const [languages, setLanguages] = useState<string>("")
  const [hackathonExperience, setHackathonExperience] =
    useState<HackathonExperience | null>(null)

  const validateForm = async () => {
    const data: ExperienceFields = {
      coursework,
      languages,
      hackathonExperience: hackathonExperience as HackathonExperience
    }
    await dispatch(actions.application.saveExperience(data))
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
      setCoursework(experienceFields.coursework ?? "")
      setLanguages(experienceFields.languages ?? "")
      setHackathonExperience(experienceFields.hackathonExperience)
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        EXPERIENCE
      </Typography>
      <TextField
        label="Relevant Coursework"
        variant="outlined"
        fullWidth
        value={coursework}
        onChange={(e) => {
          setCoursework(e.target.value)
        }}
      />
      <TextField
        label="Programming Languages"
        variant="outlined"
        fullWidth
        value={languages}
        onChange={(e) => {
          setLanguages(e.target.value)
        }}
      />
      <Autocomplete
        options={Object.values(HackathonExperience)}
        value={hackathonExperience}
        onChange={(e, value) => setHackathonExperience(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Years of Hackathon Experience"
            required
          />
        )}
      />
    </div>
  )
}

export default ExperienceSection
