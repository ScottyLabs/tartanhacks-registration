import { makeStyles, Typography } from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import React, { ReactElement } from "react"
import { useDispatch } from "react-redux"
import { AnalyticsData } from "src/_types/AnalyticsData"
import {
  CheckCircle,
  Cancel,
  AccessibilityNew,
  Restaurant,
  Person,
  Computer
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
  }
}))

const Stats = ({
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
    return Array.from(Object.keys(data.dietaryRestrictions))
      .map((r) => r + " (" + data.dietaryRestrictions[r] + ")")
      .join(", ")
  }

  return (
    <div className={classes.section}>
      <Typography variant="h4">STATS</Typography>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Total Users: {data.total}
        </Typography>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Verified Users: {data.verified} (
          {Math.round((data.verified / data.total) * 100)}%)
        </Typography>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Submitted Users: {data.submitted} (
          {Math.round((data.submitted / data.total) * 100)}%)
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Admitted: {data.admitted}
        </Typography>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Confirmed (Total): {data.confirmed}
        </Typography>
        <Typography className={classes.entry}>
          <CheckCircle className={classes.icon} htmlColor="green" />
          Confirmed (CMU) {data.confirmedCmu}
        </Typography>
        <Typography className={classes.entry}>
          <Cancel className={classes.icon} htmlColor="red" />
          Declined {data.declined}
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <AccessibilityNew className={classes.icon} />
          Shirt sizes: {parseShirtSizes(data)}
        </Typography>
        <Typography className={classes.entry}>
          <Computer className={classes.icon} />
          Need Hardware: {data.wantsHardware}
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <Restaurant className={classes.icon} />
          Dietary Restrictions: {parseDietRestrictions(data)}
        </Typography>
      </div>
      <div className={classes.subsection}>
        <Typography className={classes.entry}>
          <Person className={classes.icon} />
          Attending Physically: {data.attendance.physical} (
          {Math.round((data.attendance.physical / data.submitted) * 100)}%)
        </Typography>
        <Typography className={classes.entry}>
          <Computer className={classes.icon} />
          Attending Virtually: {data.attendance.virtual} (
          {Math.round((data.attendance.virtual / data.submitted) * 100)}%)
        </Typography>
      </div>
    </div>
  )
}

export default Stats
