import { TextField, Typography } from "@mui/material"
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

  const validateForm = async () => {
    const data: ExperienceFields = {
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
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        Experience
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
    </div>
  )
}

export default ExperienceSection
