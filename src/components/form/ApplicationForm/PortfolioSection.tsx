import {
  Button,
  CircularProgress,
  Collapse,
  TextField,
  Typography
} from "@material-ui/core"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { PortfolioFields } from "types/ApplicationForm"
import { DispatchAction } from "types/DispatchAction"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

const PortfolioSection = ({
  setError,
  setErrorMessage,
  validate,
  setValidate,
  setValid
}: {
  setError: Dispatch<SetStateAction<boolean>>
  setErrorMessage: Dispatch<SetStateAction<string>>
  validate: boolean
  setValidate: Dispatch<SetStateAction<boolean>>
  setValid: Dispatch<SetStateAction<boolean>>
}): ReactElement => {
  const dispatch = useDispatch()

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )
  const portfolioFields =
    useSelector((state: RootState) => state?.application?.portfolio) ?? {}

  // Portfolio
  const [github, setGithub] = useState<string>("")
  const [resume, setResume] = useState<string>("")
  const [resumeFileName, setResumeFileName] = useState<string>()
  const [design, setDesign] = useState<string>("")
  const [website, setWebsite] = useState<string>("")
  const [uploading, setUploading] = useState(false)

  const uploadResume = async (file: File) => {
    try {
      setUploading(true)
      const { data: fileId } = await dispatch(
        actions.application.uploadResume(file)
      )
      setResume(fileId)
      setResumeFileName(file.name)
      setUploading(false)
    } catch (err) {
      console.error(err)
      setError(true)
      setErrorMessage((err as DispatchAction)?.data)
    }
  }

  const validateForm = async () => {
    let valid = true
    if (!resume || resume === "") {
      valid = false
      setError(true)
      await dispatch(actions.application.errorMissingResume())
    }

    if (valid) {
      const data: PortfolioFields = {
        github,
        resume,
        design,
        website
      }
      await dispatch(actions.application.savePortfolio(data))
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
      setGithub(portfolioFields.github ?? "")
      setDesign(portfolioFields.design ?? "")
      setWebsite(portfolioFields.website ?? "")
      if (portfolioFields.resume) {
        setResume(portfolioFields.resume ?? "")
        setResumeFileName("Uploaded")
      }
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        PORTFOLIO
      </Typography>
      <div className={styles.resumeUploadContainer}>
        <Button variant="outlined" component="label">
          Upload Resume *
          <input
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                uploadResume(e.target.files[0])
              }
            }}
          />
        </Button>
        <Collapse in={uploading}>
          <CircularProgress />
        </Collapse>
        <Typography variant="body2">{resumeFileName}</Typography>
      </div>
      <TextField
        label="GitHub Username"
        variant="outlined"
        helperText="We use GitHub to handle project submissions"
        required
        fullWidth
        value={github}
        onChange={(e) => {
          setGithub(e.target.value)
        }}
      />
      <TextField
        label="Design"
        variant="outlined"
        fullWidth
        value={design}
        onChange={(e) => {
          setDesign(e.target.value)
        }}
      />
      <TextField
        label="Website"
        variant="outlined"
        fullWidth
        value={website}
        onChange={(e) => {
          setWebsite(e.target.value)
        }}
      />
    </div>
  )
}

export default PortfolioSection
