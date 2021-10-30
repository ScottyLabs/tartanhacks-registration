import {
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  LinearProgress,
  Link,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import {
  CMUCollege,
  CollegeLevel,
  Ethnicity,
  Gender,
  HackathonExperience,
  Region,
  ShirtSize,
  WorkPermission
} from "enums/Profile"
import { ObjectId } from "mongodb"
import { useRouter } from "next/dist/client/router"
import React, { ReactElement, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RoundedButton from "../../design/RoundedButton"
import BasicSection from "./BasicSection"
import EssaySection from "./EssaySection"
import ExperienceSection from "./ExperienceSection"
import LogisticsSection from "./LogisticsSection"
import PortfolioSection from "./PortfolioSection"
import SchoolSection from "./SchoolSection"
import WorkAuthorizationSection from "./WorkAuthorizationSection"

const useStyles = makeStyles((theme) => ({
  formDialog: {
    width: "60%",
    padding: "2em",
    display: "flex",
    flexDirection: "column",
    marginBottom: "3em"
  },
  applicationForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  headerContainer: {
    width: "30%",
    textAlign: "center",
    alignSelf: "center"
  },
  header: {
    borderBottom: `solid ${theme.palette.text.primary} 2px`,
    paddingBottom: "1rem"
  },
  formContents: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    gap: "2em"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center"
  }
}))

const ApplicationForm = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const classes = useStyles(theme)

  return (
    <Paper className={classes.formDialog}>
      <form className={classes.applicationForm}>
        <div className={classes.headerContainer}>
          <Typography variant="h3" className={classes.header}>
            Application
          </Typography>
        </div>
        <div className={classes.formContents}>
          <BasicSection />
          <SchoolSection />
          <ExperienceSection />
          <WorkAuthorizationSection />
          <PortfolioSection />
          <EssaySection />
          <LogisticsSection />
          <div className={classes.buttonContainer}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Paper>
  )
}

export default ApplicationForm
