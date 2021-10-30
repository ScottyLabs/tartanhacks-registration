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

const PortfolioSection = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  // Portfolio
  const [github, setGithub] = useState<string>()
  const [resume, setResume] = useState<string>()
  const [design, setDesign] = useState<string>()
  const [website, setWebsite] = useState<string>()

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        PORTFOLIO
      </Typography>
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
        label="Resume"
        variant="outlined"
        fullWidth
        value={resume}
        onChange={(e) => {
          setResume(e.target.value)
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
