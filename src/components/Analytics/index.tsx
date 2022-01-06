import {
  CircularProgress,
  Collapse,
  makeStyles,
  Snackbar,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import React, { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import { ObjectId } from "mongodb"
import Stats from "./Stats"
import Demographics from "./Demographics"
import { AnalyticsData } from "src/_types/AnalyticsData"

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center"
  },
  contents: {
    marginTop: "2em",
    marginLeft: "10em",
    display: "flex",
    flexDirection: "column",
    gap: "2em",
    width: "80%"
  },
  headerContainer: {
    textAlign: "center",
    alignSelf: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    },
    paddingBottom: "0.5rem"
  },
  header: {
    borderBottom: `solid ${theme.palette.text.primary} 2px`,
    paddingBottom: "0.5rem",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "2.5em"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "1.8em"
    },
    color: theme.palette.text.primary,
    fontWeight: 600
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center"
  }
}))

const Analytics = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<AnalyticsData | undefined>()

  useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true)
      try {
        const { data } = await dispatch(actions.analytics.get())
        setData(data)
      } catch (err: any) {
        setError(true)
        setErrorMessage(err.data)
      }
      setLoading(false)
    }
    getAnalytics()
  }, [])

  return (
    <div className={classes.container}>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <div className={classes.headerContainer}>
        <Typography variant="h4" className={classes.header}>
          Analytics
        </Typography>
      </div>
      <Collapse in={loading}>
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      </Collapse>
      <div className={classes.contents}>
        <Stats data={data} />
      </div>
      <div className={classes.contents}>
        <Demographics data={data} />
      </div>
    </div>
  )
}

export default Analytics
