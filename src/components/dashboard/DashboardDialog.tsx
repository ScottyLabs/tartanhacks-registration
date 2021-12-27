import {
  CircularProgress,
  Collapse,
  LinearProgress,
  Link,
  makeStyles,
  Snackbar,
  Typography
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { DateTime } from "luxon"
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import getApplicationStatus from "src/util/getApplicationStatus"
import { RootState } from "types/RootState"
import RectangleButton from "../design/RectangleButton"
import Image from "next/image"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    borderRadius: "25px",
    padding: "2em",
    margin: "0 auto",
    flexDirection: "column",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 227, 227, 0.7565) 
    35.13%, rgba(255, 255, 255, 0.85) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "80%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "70%"
    }
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  link: {
    "&:hover": {
      textDecoration: "none",
      filter: "brightness(85%)"
    }
  },
  statusText: {
    marginBottom: "0.5em",
    color: `${theme.palette.gradient.start}`
  },
  dialogText: {
    marginBottom: "1em",
    color: `${theme.palette.gradient.start}`,
    width: "100%",
    textAlign: "center"
  },
  bodyText: {
    color: `${theme.palette.gradient.start}`
  },
  emphasisText: {
    marginBottom: "1em",
    color: `${theme.palette.primary.main}`
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      flexDirection: "column",
      gap: "0.5em",
      alignItems: "center"
    }
  },
  buttonSpacer: {
    width: "10px"
  },
  deadline: {
    fontWeight: "bold",
    fontSize: "1.3em"
  },
  appStoreLinks: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1em",
    gap: "0.5em"
  }
}))

const getDialogText = (
  classes: any,
  applicationStatus: ApplicationStatus,
  closeTime: string,
  confirmTime: string
): ReactElement => {
  if (applicationStatus === ApplicationStatus.VERIFIED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            You still need to complete your application!
          </Typography>
        </div>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            If you do not complete your application by
            <br />
            <span className={classes.deadline}>{closeTime}</span>, you will not
            be admitted!
          </Typography>
        </div>
      </>
    )
  } else if (applicationStatus == ApplicationStatus.APPLIED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">Welcome back!</Typography>
        </div>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            You can edit your information until
            <br />
            <span className={classes.deadline}>{confirmTime}</span>
          </Typography>
        </div>
      </>
    )
  } else if (applicationStatus === ApplicationStatus.ADMITTED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">Welcome to Tartanhacks!</Typography>
          <Typography variant="body1">
            Please confirm your attendance by
          </Typography>
          <span className={classes.deadline}>{confirmTime}</span>
        </div>
      </>
    )
  } else if (applicationStatus === ApplicationStatus.REJECTED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            Thanks for applying! We were unable to accommodate you this year.
            Please apply again next year!
          </Typography>
        </div>
      </>
    )
  } else if (applicationStatus === ApplicationStatus.CONFIRMED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            Thanks for confirming your attendance!
          </Typography>
          <Typography variant="body1">We hope to see you soon!</Typography>
          <Typography variant="body1">
            In the meantime, download our Dashboard App!
          </Typography>
          <div className={classes.appStoreLinks}>
            <Link
              href="https://play.google.com/store/apps/details?id=org.scottylabs.thdappfinal"
              target="_blank"
            >
              <Image
                alt="Get it on Google Play"
                src="/google-play-badge.svg"
                width={563 * (40 / 168)}
                height={40}
              />
            </Link>
            <Link
              href="https://apps.apple.com/us/app/scottylabs-dashboard/id1556362423"
              target="_blank"
            >
              <Image
                alt="Download on the App Store"
                src="/ios-app-store-badge.svg"
                width={120}
                height={40}
              />
            </Link>
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}

const getButtonBox = (
  classes: any,
  applicationStatus: ApplicationStatus,
  resendVerification: () => Promise<void>
): ReactElement => {
  if (applicationStatus === ApplicationStatus.UNVERIFIED) {
    return (
      <RectangleButton type="button" onClick={() => resendVerification()}>
        RESEND VERIFICATION EMAIL
      </RectangleButton>
    )
  } else if (applicationStatus === ApplicationStatus.VERIFIED) {
    return (
      <Link href="/apply" className={classes.link}>
        <RectangleButton type="submit">
          COMPLETE YOUR APPLICATION
        </RectangleButton>
      </Link>
    )
  } else if (applicationStatus === ApplicationStatus.APPLIED) {
    return (
      <div className={classes.buttonBox}>
        <Link href="/apply" className={classes.link}>
          <RectangleButton type="submit">EDIT APPLICATION</RectangleButton>
        </Link>
      </div>
    )
  } else if (applicationStatus === ApplicationStatus.ADMITTED) {
    return (
      <div className={classes.buttonBox}>
        <Link href="/confirmation" className={classes.link}>
          <RectangleButton type="submit">CONFIRM</RectangleButton>
        </Link>
        <div className={classes.buttonSpacer}></div>
        <RectangleButton type="submit">
          SORRY, I CAN&apos;T MAKE IT
        </RectangleButton>
      </div>
    )
  } else {
    return <></>
  }
}

const DashboardDialog = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [loading, setLoading] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarState, setSnackbarState] = useState<"success" | "error">(
    "success"
  )
  const [snackbarMessage, setSnackbarMessage] = useState("")

  const closeTime = useSelector(
    (state: RootState) => state?.settings?.closeTime
  )
  const confirmTime = useSelector(
    (state: RootState) => state?.settings?.confirmTime
  )

  const closeTimeStr = DateTime.fromJSDate(closeTime).toFormat("dd LLL yyyy")
  const confirmTimeStr =
    DateTime.fromJSDate(confirmTime).toFormat("dd LLL yyyy")

  const status =
    useSelector((state: RootState) => state?.user?.data?.status) ?? {}
  const email =
    useSelector((state: RootState) => state?.accounts?.data?.email) || ""
  const applicationStatus = getApplicationStatus(status)

  const resendVerification = async () => {
    setLoading(true)
    try {
      await dispatch(actions.auth.resendVerification(email))
      setSnackbarMessage("Sent verification email to: " + email)
      setSnackbarState("success")
      setSnackbarOpen(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const dialogText = getDialogText(
    classes,
    applicationStatus,
    closeTimeStr,
    confirmTimeStr
  )
  const buttonBox = getButtonBox(classes, applicationStatus, resendVerification)

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={(e) => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbarState}>{snackbarMessage}</Alert>
      </Snackbar>
      <div className={classes.dialog}>
        <div className={classes.dialogContent}>
          <div className={classes.statusText}>
            <Typography variant="h4">Your Status:</Typography>
          </div>
          <div className={classes.emphasisText}>
            <Typography variant="h4">{applicationStatus}</Typography>
          </div>
          {dialogText}
          {buttonBox}
        </div>
        <Collapse in={loading}>
          <br />
          <CircularProgress />
        </Collapse>
      </div>
    </>
  )
}

export default DashboardDialog
