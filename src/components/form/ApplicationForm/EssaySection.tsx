import { TextField, Typography } from "@material-ui/core"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { EssayFields } from "types/ApplicationForm"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

const EssaySection = ({
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
  const essayStore =
    useSelector((state: RootState) => state?.application?.essays?.essays) ?? []

  // Essays
  const [essay, setEssay] = useState<string>("")

  const validateForm = async () => {
    const data: EssayFields = { essays: [essay] }
    await dispatch(actions.application.saveEssay(data))
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
    if (fetchedProfile && essayStore && essayStore.length > 0) {
      setEssay(essayStore[0])
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        Essays
      </Typography>
      <Typography variant="body1">
        Why do you want to join TartanHacks?
      </Typography>
      <TextField
        label="Write answer here"
        variant="outlined"
        required
        fullWidth
        multiline
        value={essay}
        onChange={(e) => {
          setEssay(e.target.value)
        }}
      />
    </div>
  )
}

export default EssaySection
