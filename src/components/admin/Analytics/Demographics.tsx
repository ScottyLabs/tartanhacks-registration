import { makeStyles, TextField, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AnalyticsData } from "src/_types/AnalyticsData"
import {
  CheckCircle,
  Cancel,
  Person,
  CalendarToday,
  School,
  Code,
  AlternateEmail
} from "@material-ui/icons"

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
    marginRight: "0.5em"
  },
  iconList: {
    marginRight: "0.1em"
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

  if (data === undefined) {
    return <></>
  }

  const parseGraduationYear = (
    data: AnalyticsData | undefined
  ): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.year)).map((year) => (
      <li key={year}>
        {year +
          ": " +
          data.demographic.year[year] +
          " (" +
          Math.round((data.demographic.year[year] / data.submitted) * 100) +
          "%)"}
      </li>
    ))
  }

  const parseCollege = (
    data: AnalyticsData | undefined
  ): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.colleges))
      .filter((college) => college !== "undefined")
      .map((college) => (
        <li key={college}>
          {college +
            ": " +
            data.demographic.colleges[college] +
            " (" +
            Math.round(
              (data.demographic.colleges[college] / data.submitted) * 100
            ) +
            "%)"}
        </li>
      ))
  }

  const parseExperience = (
    data: AnalyticsData | undefined
  ): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.experiences)).map((ex) => (
      <li key={ex}>
        {ex +
          ": " +
          data.experiences[ex] +
          " (" +
          Math.round((data.experiences[ex] / data.submitted) * 100) +
          "%)"}
      </li>
    ))
  }

  const parseDomains = (
    data: AnalyticsData | undefined
  ): JSX.Element[] | null => {
    if (data === undefined) {
      return null
    }
    return Array.from(Object.keys(data.demographic.schools)).map((school) => (
      <li key={school}>
        {school +
          ": " +
          data.demographic.schools[school].submitted +
          " (" +
          Math.round(
            (data.demographic.schools[school].submitted / data.submitted) * 100
          ) +
          "%)"}
        <ul className={classes.statusList}>
          <li>
            <Typography className={classes.entry}>
              <CheckCircle className={classes.icon} htmlColor="green" />{" "}
              submitted: {data.demographic.schools[school].submitted}
            </Typography>
          </li>
          <li>
            <Typography className={classes.entry}>
              <CheckCircle className={classes.icon} htmlColor="green" />{" "}
              admitted: {data.demographic.schools[school].admitted}
            </Typography>
          </li>
          <li>
            <Typography className={classes.entry}>
              <CheckCircle className={classes.icon} htmlColor="green" />{" "}
              confirmed: {data.demographic.schools[school].confirmed}
            </Typography>
          </li>
          <li>
            <Typography className={classes.entry}>
              <Cancel className={classes.icon} htmlColor="red" /> declined:{" "}
              {data.demographic.schools[school].declined}
            </Typography>
          </li>
        </ul>
      </li>
    ))
  }

  return (
    <div className={classes.section}>
      <Typography variant="h4">DEMOGRAPHICS</Typography>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <Person className={classes.icon} />
          Female: {data.demographic.gender["Female"] || 0} (
          {Math.round(
            ((data.demographic.gender["Female"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={classes.entry}>
          <Person className={classes.icon} />
          Male: {data.demographic.gender["Male"] || 0} (
          {Math.round(
            ((data.demographic.gender["Male"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={classes.entry}>
          <Person className={classes.icon} />
          Other: {data.demographic.gender["Other"] || 0} (
          {Math.round(
            ((data.demographic.gender["Other"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={classes.entry}>
          <Person className={classes.icon} />
          Did not respond: {data.demographic.gender["Prefer not to say"] || 0} (
          {Math.round(
            ((data.demographic.gender["Prefer not to say"] || 0) /
              data.submitted) *
              100
          )}
          %)
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <CalendarToday className={classes.icon} />
          Graduation year
        </Typography>
        <Typography className={classes.entry}>
          <ul>{parseGraduationYear(data)}</ul>
        </Typography>
        <Typography className={classes.entry}>
          <Code className={classes.icon} />
          Years of Hackathon Experience
        </Typography>
        <Typography className={classes.entry}>
          <ul>{parseExperience(data)}</ul>
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <School className={classes.icon} />
          CMU Colleges
        </Typography>
        <Typography className={classes.entry}>
          <ul>{parseCollege(data)}</ul>
        </Typography>
        <Typography className={classes.entry}>
          <AlternateEmail className={classes.icon} />
          Domains
        </Typography>
        <Typography className={classes.entry}>
          <ul>{parseDomains(data)}</ul>
        </Typography>
      </div>
    </div>
  )
}

export default Demographics
