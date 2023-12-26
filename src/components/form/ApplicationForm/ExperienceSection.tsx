import { Chip, TextField, Typography } from "@mui/material"
import { Autocomplete } from "@mui/material"
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
import styles from "./index.module.scss"
import { languageList } from "src/util/lists"

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

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )
  const experienceFields =
    useSelector((state: RootState) => state?.application?.experience) ?? {}

  // Experience
  const [hackathonExperience, setHackathonExperience] =
    useState<HackathonExperience | null>(null)

  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([])
  const [courses, setCourses] = useState<string[]>([])
  const [otherSkills, setOtherSkills] = useState<string[]>([])

  const validateForm = async () => {
    const data: ExperienceFields = {
      courses,
      programmingLanguages,
      otherSkills,
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
      setHackathonExperience(experienceFields.hackathonExperience)
      setProgrammingLanguages(experienceFields.programmingLanguages ?? [])
      setCourses(experienceFields.courses ?? [])
      setOtherSkills(experienceFields.otherSkills ?? [])
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        Skills and Interests
      </Typography>
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
      <Autocomplete
        options={[]}
        value={courses}
        onChange={(e, value) => setCourses(value)}
        multiple
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Relevant coursework"
          />
        )}
      />
      <Autocomplete
        options={languageList}
        value={programmingLanguages}
        onChange={(e, value) => setProgrammingLanguages(value)}
        multiple
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Programming languages"
          />
        )}
      />
      <Autocomplete
        options={[]}
        value={otherSkills}
        onChange={(e, value) => setOtherSkills(value)}
        multiple
        freeSolo
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        renderInput={(params) => (
          <TextField variant="outlined" {...params} label="Other skills" />
        )}
      />
    </div>
  )
}

export default ExperienceSection
