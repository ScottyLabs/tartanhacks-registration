import { Button, makeStyles, TextField, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
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
  },
  resumeUploadContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1em"
  }
}))

const PortfolioSection = ({
  setError
}: {
  setError: Dispatch<SetStateAction<boolean>>
}): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  // Portfolio
  const [github, setGithub] = useState<string>()
  const [resume, setResume] = useState<string>()
  const [resumeFileName, setResumeFileName] = useState<string>()
  const [design, setDesign] = useState<string>()
  const [website, setWebsite] = useState<string>()
  const [uploading, setUploading] = useState(false)

  const uploadResume = async (file: File) => {
    try {
      setUploading(true)
      const { data: fileId } = await dispatch(actions.application.uploadResume(file))
      setResume(fileId)
      setUploading(false)
    } catch (err) {
      console.error(err)
      setError(true)
    }
  }

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        PORTFOLIO
      </Typography>
      <div className={classes.resumeUploadContainer}>
        <Button variant="outlined" component="label">
          Upload Resume
          <input
            type="file"
            hidden
            onChange={(e) => {
              console.log(e.target.files)
              if (e.target.files && e.target.files.length > 0) {
                uploadResume(e.target.files[0])
                setResumeFileName(e.target.files[0].name)
              }
            }}
          />
        </Button>
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
