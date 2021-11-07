import {
  Button,
  makeStyles,
  Paper,
  Snackbar,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/dist/client/router"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
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
    marginBottom: "3em",
    zIndex: 5,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.lightGradient.start} 0%, ${theme.palette.lightGradient.end} 189%)`
  },
  applicationForm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  headerContainer: {
    width: "40%",
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
  const classes = useStyles(theme)

  const [error, setError] = useState(false)
  const errorMessage = useSelector(
    (state: RootState) => state?.application?.error
  )
  const application = useSelector((state: RootState) => state?.application)

  const [validateBasic, setValidateBasic] = useState(false)
  const [validateEssay, setValidateEssay] = useState(false)
  const [validateExperience, setValidateExperience] = useState(false)
  const [validateLogistics, setValidateLogistics] = useState(false)
  const [validatePortfolio, setValidatePortfolio] = useState(false)
  const [validateSchool, setValidateSchool] = useState(false)
  const [validateWorkAuth, setValidateWorkAuth] = useState(false)

  const [validBasic, setValidBasic] = useState(false)
  const [validEssay, setValidEssay] = useState(false)
  const [validExperience, setValidExperience] = useState(false)
  const [validLogistics, setValidLogistics] = useState(false)
  const [validPortfolio, setValidPortfolio] = useState(false)
  const [validSchool, setValidSchool] = useState(false)
  const [validWorkAuth, setValidWorkAuth] = useState(false)

  const valid =
    validBasic &&
    // validEssay &&
    // validExperience &&
    // validLogistics &&
    // validPortfolio &&
    validSchool
  // validWorkAuth

  const validateForm = async () => {
    // Trigger section validation
    setValidateBasic(true)
    setValidateEssay(true)
    setValidateExperience(true)
    setValidateLogistics(true)
    setValidatePortfolio(true)
    setValidateSchool(true)
    setValidateWorkAuth(true)
  }

  useEffect(() => {
    if (valid) {
      console.log("Submitting form")
      console.log(application)
    }
  }, [valid])

  return (
    <Paper className={classes.formDialog}>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <form
        className={classes.applicationForm}
        onSubmit={(e) => {
          e.preventDefault()
          validateForm()
        }}
      >
        <div className={classes.headerContainer}>
          <Typography variant="h3" className={classes.header}>
            Application
          </Typography>
        </div>
        <div className={classes.formContents}>
          <BasicSection
            validate={validateBasic}
            setValidate={setValidateBasic}
            setValid={setValidBasic}
          />
          <SchoolSection
            validate={validateSchool}
            setValidate={setValidateSchool}
            setValid={setValidSchool}
          />
          <ExperienceSection
            validate={validateExperience}
            setValidate={setValidateExperience}
            setValid={setValidExperience}
          />
          <WorkAuthorizationSection
            validate={validateWorkAuth}
            setValidate={setValidateWorkAuth}
            setValid={setValidWorkAuth}
          />
          <PortfolioSection
            setError={setError}
            validate={validatePortfolio}
            setValidate={setValidatePortfolio}
            setValid={setValidPortfolio}
          />
          <EssaySection
            validate={validateEssay}
            setValidate={setValidateEssay}
            setValid={setValidEssay}
          />
          <LogisticsSection
            validate={validateLogistics}
            setValidate={setValidateLogistics}
            setValid={setValidLogistics}
          />
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
