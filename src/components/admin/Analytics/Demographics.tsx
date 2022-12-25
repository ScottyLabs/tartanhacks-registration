import { Typography } from "@mui/material"
import {
  AlternateEmail,
  CalendarToday,
  Cancel,
  CheckCircle,
  Code,
  Person,
  School
} from "@mui/icons-material"
import { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { AnalyticsData } from "src/_types/AnalyticsData"
import styles from "./index.module.scss"

const Demographics = ({
  data
}: {
  data?: AnalyticsData | undefined
}): ReactElement => {
  const dispatch = useDispatch()

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
        <ul className={styles.statusList}>
          <li>
            <Typography className={styles.entry}>
              <CheckCircle className={styles.icon} htmlColor="green" />{" "}
              submitted: {data.demographic.schools[school].submitted}
            </Typography>
          </li>
          <li>
            <Typography className={styles.entry}>
              <CheckCircle className={styles.icon} htmlColor="green" />{" "}
              admitted: {data.demographic.schools[school].admitted}
            </Typography>
          </li>
          <li>
            <Typography className={styles.entry}>
              <CheckCircle className={styles.icon} htmlColor="green" />{" "}
              confirmed: {data.demographic.schools[school].confirmed}
            </Typography>
          </li>
          <li>
            <Typography className={styles.entry}>
              <Cancel className={styles.icon} htmlColor="red" /> declined:{" "}
              {data.demographic.schools[school].declined}
            </Typography>
          </li>
        </ul>
      </li>
    ))
  }

  return (
    <div className={styles.section}>
      <Typography variant="h4">DEMOGRAPHICS</Typography>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <Person className={styles.icon} />
          Female: {data.demographic.gender["Female"] || 0} (
          {Math.round(
            ((data.demographic.gender["Female"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={styles.entry}>
          <Person className={styles.icon} />
          Male: {data.demographic.gender["Male"] || 0} (
          {Math.round(
            ((data.demographic.gender["Male"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={styles.entry}>
          <Person className={styles.icon} />
          Other: {data.demographic.gender["Other"] || 0} (
          {Math.round(
            ((data.demographic.gender["Other"] || 0) / data.submitted) * 100
          )}
          %)
        </Typography>
        <Typography className={styles.entry}>
          <Person className={styles.icon} />
          Did not respond: {data.demographic.gender["Prefer not to say"] || 0} (
          {Math.round(
            ((data.demographic.gender["Prefer not to say"] || 0) /
              data.submitted) *
              100
          )}
          %)
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <CalendarToday className={styles.icon} />
          Graduation year
        </Typography>
        <Typography className={styles.entry}>
          <ul>{parseGraduationYear(data)}</ul>
        </Typography>
        <Typography className={styles.entry}>
          <Code className={styles.icon} />
          Years of Hackathon Experience
        </Typography>
        <Typography className={styles.entry}>
          <ul>{parseExperience(data)}</ul>
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <School className={styles.icon} />
          CMU Colleges
        </Typography>
        <Typography className={styles.entry}>
          <ul>{parseCollege(data)}</ul>
        </Typography>
        <Typography className={styles.entry}>
          <AlternateEmail className={styles.icon} />
          Domains
        </Typography>
        <Typography className={styles.entry}>
          <ul>{parseDomains(data)}</ul>
        </Typography>
      </div>
    </div>
  )
}

export default Demographics
