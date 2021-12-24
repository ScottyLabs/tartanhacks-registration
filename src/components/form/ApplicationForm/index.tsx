import {
  Button,
  CircularProgress,
  Collapse,
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "3em",
    zIndex: 5,
    backgroundImage: `linear-gradient(135deg, ${theme.palette.lightGradient.start} 0%, ${theme.palette.lightGradient.end} 189%)`,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "80%",
      marginTop: "10%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%",
      marginTop: "20%"
    }
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
    alignSelf: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  header: {
    borderBottom: `solid ${theme.palette.text.primary} 2px`,
    paddingBottom: "1rem",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "1.8em"
    }
  },
  formContents: {
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    gap: "2em"
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "1em"
  }
}))

const ApplicationForm = (): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const theme = useTheme()
  const classes = useStyles(theme)
  const application = useSelector((state: RootState) => state?.application)
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(application?.error)

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

  const [calledValidate, setCalledValidate] = useState(false)

  // Check that all validate requests are false (i.e. completed)
  const validated = ![
    validateBasic,
    validateEssay,
    validateExperience,
    validateLogistics,
    validatePortfolio,
    validateSchool,
    validateWorkAuth
  ].some(Boolean)

  // Check that all sections are valid
  const valid = [
    validBasic,
    validEssay,
    validExperience,
    validLogistics,
    validPortfolio,
    validSchool,
    validWorkAuth
  ].every(Boolean)

  const validateForm = async () => {
    // Trigger section validation
    setValidateBasic(true)
    setValidateEssay(true)
    setValidateExperience(true)
    setValidateLogistics(true)
    setValidatePortfolio(true)
    setValidateSchool(true)
    setValidateWorkAuth(true)

    setCalledValidate(true)
  }

  const submitForm = async () => {
    const { basic, essay, experience, logistics, portfolio, school, workAuth } =
      application
    const data = {
      ...basic,
      essays: [essay],
      ...experience,
      ...logistics,
      ...portfolio,
      ...school,
      ...workAuth
    }
    setLoading(true)
    try {
      await dispatch(actions.application.submitForm(data))
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.data)
    }
    setLoading(false)
    router.push("/")
  }

  useEffect(() => {
    if (calledValidate && validated) {
      if (valid) {
        submitForm()
      } else {
        setError(true)
        setErrorMessage(
          "Some fields are incorrect. Please review to make sure you filled all required fields."
        )
      }
    }
  }, [valid, calledValidate, validated])

  useEffect(() => {
    dispatch(actions.application.getProfile())
  }, [])

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
            setErrorMessage={setErrorMessage}
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
            <Collapse in={loading}>
              <CircularProgress />
            </Collapse>
          </div>
        </div>
      </form>
    </Paper>
  )
}

export default ApplicationForm
