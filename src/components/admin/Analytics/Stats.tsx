import { Typography } from "@mui/material"
import {
  AccessibilityNew,
  Cancel,
  CheckCircle,
  Computer,
  Person,
  Restaurant
} from "@mui/icons-material"
import { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { AnalyticsData } from "src/_types/AnalyticsData"
import styles from "./index.module.scss"

const Stats = ({
  data
}: {
  data?: AnalyticsData | undefined
}): ReactElement => {
  const dispatch = useDispatch()

  if (data === undefined) {
    return <></>
  }

  const parseShirtSizes = (data: AnalyticsData | undefined): string => {
    if (data === undefined) {
      return ""
    }
    return Array.from(Object.keys(data.shirtSizes))
      .map((size) => size + " (" + data.shirtSizes[size] + ")")
      .join(", ")
  }

  const parseDietRestrictions = (data: AnalyticsData | undefined): string => {
    if (data === undefined) {
      return ""
    }

    const removeKeys = ["none", "n/a", "none.", "no", ""]
    const restrictions = Object.keys(data.dietaryRestrictions)
    const filtered = restrictions.filter(
      (key) => !removeKeys.includes(key.toLowerCase().trim())
    )

    return filtered
      .map((r) => r + " (" + data.dietaryRestrictions[r] + ")")
      .join(", ")
  }

  return (
    <div className={styles.section}>
      <Typography variant="h4">STATS</Typography>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Total Users: {data.total}
        </Typography>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Verified Users: {data.verified} (
          {Math.round((data.verified / data.total) * 100)}%)
        </Typography>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Submitted Users: {data.submitted} (
          {Math.round((data.submitted / data.total) * 100)}%)
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Admitted: {data.admitted}
        </Typography>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Confirmed (Total): {data.confirmed}
        </Typography>
        <Typography className={styles.entry}>
          <CheckCircle className={styles.icon} htmlColor="green" />
          Confirmed (CMU) {data.confirmedCmu}
        </Typography>
        <Typography className={styles.entry}>
          <Cancel className={styles.icon} htmlColor="red" />
          Declined {data.declined}
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <AccessibilityNew className={styles.icon} />
          Shirt sizes: {parseShirtSizes(data)}
        </Typography>
        <Typography className={styles.entry}>
          <Computer className={styles.icon} />
          Need Hardware: {data.wantsHardware}
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <Restaurant className={styles.icon} />
          Dietary Restrictions: {parseDietRestrictions(data)}
        </Typography>
      </div>
      <div className={styles.subsection}>
        <Typography className={styles.entry}>
          <Person className={styles.icon} />
          Attending Physically: {data.attendance.physical} (
          {Math.round((data.attendance.physical / data.submitted) * 100)}%)
        </Typography>
        <Typography className={styles.entry}>
          <Computer className={styles.icon} />
          Attending Virtually: {data.attendance.virtual} (
          {Math.round((data.attendance.virtual / data.submitted) * 100)}%)
        </Typography>
      </div>
    </div>
  )
}

export default Stats
