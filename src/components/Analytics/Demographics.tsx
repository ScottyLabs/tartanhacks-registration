import { makeStyles, TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { Ethnicity, Gender } from "enums/Profile"
import React, {
  ReactElement,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { BasicFields } from "types/ApplicationForm"
import { RootState } from "types/RootState"
import { AnalyticsData } from "src/_types/AnalyticsData"
import { CheckCircle, Cancel, AccessibilityNew, Restaurant, Person, CalendarToday, School, Code, AlternateEmail } from "@material-ui/icons"

const useStyles = makeStyles((theme) => ({
  section: {
    marginTop: "1em",
    display: "flex",
    flexDirection: "column",
    gap: "1em"
  },
  entry: {
    display: "flex",
    alignItems: "center"
  },
  subsection: {
    borderBottom: `solid ${theme.palette.text.primary} 1px`,
    paddingBottom: "2rem",
    paddingTop: "1rem"
  },
  icon: {
    marginRight: "0.5em",
  },
  iconList: {
    marginRight: "0.1em",
  },
  statusList: {
    listStyle: "none"
  }
}))

const Demographics = ({
  data
}: {
  data?: AnalyticsData | undefined
}): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  console.log(data)
  if (data === undefined) {
    return <></>
  }

  const parseGraduationYear = (data: AnalyticsData | undefined): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.year))
      .map(year => <li>{year + ": " + data.demographic.year[year] + " (" + Math.round(data.demographic.year[year] / data.submitted * 100) + "%)"}</li>)
  }

  const parseCollege = (data: AnalyticsData | undefined): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.colleges))
      .filter(college => college !== "undefined")
      .map(college => <li>{college + ": " + data.demographic.colleges[college] + " (" + Math.round(data.demographic.colleges[college] / data.submitted * 100) + "%)"}</li>)
  }

  const parseExperience = (data: AnalyticsData | undefined): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.experiences))
      .map(ex => <li>{ex + ": " + data.experiences[ex] + " (" + Math.round(data.experiences[ex] / data.submitted * 100) + "%)"}</li>)
  }

  const parseDomains = (data: AnalyticsData | undefined): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.schools))
      .map(school =>
        <li>
          {school + ": " + data.demographic.schools[school].submitted + " (" + Math.round(data.demographic.schools[school].submitted / data.submitted * 100) + "%)"}
          <ul className={classes.statusList}>
            <li>
              <Typography variant="h6" className={classes.entry}>
                <CheckCircle className={classes.icon} htmlColor="green" /> submitted: {data.demographic.schools[school].submitted}
              </Typography>
            </li>
            <li>
              <Typography variant="h6" className={classes.entry}>
                <CheckCircle className={classes.icon} htmlColor="green" /> admitted: {data.demographic.schools[school].admitted}
              </Typography>
            </li>
            <li>
              <Typography variant="h6" className={classes.entry}>
                <CheckCircle className={classes.icon} htmlColor="green" /> confirmed: {data.demographic.schools[school].confirmed}
              </Typography>
            </li>
            <li>
              <Typography variant="h6" className={classes.entry}>
                <Cancel className={classes.icon} htmlColor="red" /> declined: {data.demographic.schools[school].declined}
              </Typography>
            </li>
          </ul>
        </li>)
  }

  return (
    <div className={classes.section}>
      <Typography variant="h5">
        DEMOGRAPHICS
      </Typography>
      <div className={classes.subsection}>
        <Typography variant="h6" className={classes.entry}>
          <Person className={classes.icon} />Female: {data.demographic.gender["Female"] || 0} ({Math.round((data.demographic.gender["Female"] || 0) / data.submitted * 100)}%)
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <Person className={classes.icon} />Male: {data.demographic.gender["Male"] || 0} ({Math.round((data.demographic.gender["Male"] || 0) / data.submitted * 100)}%)
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <Person className={classes.icon} />Other: {data.demographic.gender["Other"] || 0} ({Math.round((data.demographic.gender["Other"] || 0) / data.submitted * 100)}%)
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <Person className={classes.icon} />Did not respond: {data.demographic.gender["Prefer not to say"] || 0} ({Math.round((data.demographic.gender["Prefer not to say"] || 0) / data.submitted * 100)}%)
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography variant="h6" className={classes.entry}>
          <CalendarToday className={classes.icon} />Graduation year
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <ul>
            {parseGraduationYear(data)}
          </ul>
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <Code className={classes.icon} />Years of Hackathon Experience
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <ul>
            {parseExperience(data)}
          </ul>
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography variant="h6" className={classes.entry}>
          <School className={classes.icon} />CMU Colleges
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <ul>
            {parseCollege(data)}
          </ul>
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <AlternateEmail className={classes.icon} />Domains
        </Typography>
        <Typography variant="h6" className={classes.entry}>
          <ul>
            {parseDomains(data)}
          </ul>
        </Typography>
      </div>
    </div>
  )
}

export default Demographics
