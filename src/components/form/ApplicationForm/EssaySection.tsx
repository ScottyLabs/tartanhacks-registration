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

const EssaySection = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  // Essays
  const [essay1, setEssay1] = useState<string>()

  return (
    <div className={classes.section}>
      <Typography variant="h5" className={classes.sectionHeader}>
        Essays
      </Typography>
      <Typography variant="body1" className={classes.essayPrompt}>
        1. Why do you want to join TartanHacks?
      </Typography>
      <TextField
        label="Write answer here"
        variant="outlined"
        required
        fullWidth
        multiline
        value={essay1}
        onChange={(e) => {
          setEssay1(e.target.value)
        }}
      />
    </div>
  )
}

export default EssaySection
