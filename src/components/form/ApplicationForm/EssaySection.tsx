import { makeStyles, TextField, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import { EssayFields } from "types/ApplicationForm"

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
  const theme = useTheme()
  const classes = useStyles(theme)

  // Essays
  const [essay, setEssay] = useState<string>("")

  const validateForm = async () => {
    const data: EssayFields = { essay }
    await dispatch(actions.application.saveEssay(data))
    setValid(true)
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
