import { Button, makeStyles, Paper, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/dist/client/router"
import React, { ReactElement } from "react"
import { useDispatch } from "react-redux"
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
  const classes = useStyles(theme)

  const validateInput = () => {}

  return (
    <Paper className={classes.formDialog}>
      <form
        className={classes.applicationForm}
        onSubmit={(e) => {
          e.preventDefault()
          validateInput()
        }}
      >
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
