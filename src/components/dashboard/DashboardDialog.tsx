import {
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  makeStyles,
  Snackbar,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useTheme } from "@material-ui/styles"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { DateTime } from "luxon"
import NextLink from "next/link"
import Router from "next/router"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import getApplicationStatus from "src/util/getApplicationStatus"
import { RootState } from "types/RootState"
import RectangleButton from "../design/RectangleButton"
import Image from "next/image"
import { Computer } from "@material-ui/icons"

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
      textDecoration: "none"
    }
  },
  statusHeaderText: {
    marginBottom: "0.5em",
    color: `${theme.palette.text.primary}`
  },
  dialogText: {
    marginBottom: "1em",
    color: `${theme.palette.text.primary}`,
    width: "100%",
    textAlign: "center"
  },
  bodyText: {
    color: `${theme.palette.text.primary}`
  },
  statusText: {
    marginBottom: "1em",
    color: `${theme.palette.text.secondary}`,
    fontWeight: 600
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
  },
  dialogHeader: {
    color: theme.palette.gradient.start
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
            Thanks for confirming your attendance! We hope to see you soon!
          </Typography>
          <Typography variant="body1">
            In the meantime, join a team or create one with your friends!
          </Typography>
          <br />
          <NextLink href="/teams" passHref>
            <Link underline="none">
              <RectangleButton type="button">Browse Teams</RectangleButton>
            </Link>
          </NextLink>
          <br />
          <br />
          <Typography variant="body1">
            Once you're all set, download our Dashboard App!
          </Typography>
          <div className={classes.appStoreLinks}>
            <Link
              href="https://play.google.com/store/apps/details?id=org.scottylabs.thdapp"
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
            <Link
              href="https://dashboard.tartanhacks.com/"
              target="_blank"
              underline="none"
            >
              <RectangleButton
                type="button"
                startIcon={<Computer />}
                backgroundColor="#000"
              >
                Web
              </RectangleButton>
            </Link>
          </div>
        </div>
      </>
    )
  } else if (applicationStatus === ApplicationStatus.DECLINED) {
    return (
      <>
        <div className={classes.dialogText}>
          <Typography variant="body1">
            We&apos;re sorry you couldn&apos;t join us this year. We hope to see
            you next year!
          </Typography>
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
  resendVerification: () => Promise<void>,
  setShowDeclineDialog: (b: boolean) => void
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
        <RectangleButton
          type="button"
          onClick={() => {
            setShowDeclineDialog(true)
          }}
        >
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
  const [decliningAcceptance, setDecliningAcceptance] = useState(false)
  const [sendingVerification, setSendingVerification] = useState(false)
  const [showDeclineDialog, setShowDeclineDialog] = useState(false)
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
  const loading = status._id == null

  const resendVerification = async () => {
    setSendingVerification(true)
    try {
      await dispatch(actions.auth.resendVerification(email))
      setSnackbarMessage("Sent verification email to: " + email)
      setSnackbarState("success")
      setSnackbarOpen(true)
    } catch (err) {
      console.error(err)
    }
    setSendingVerification(false)
  }

  const declineAcceptance = async () => {
    setDecliningAcceptance(true)
    try {
      await dispatch(actions.user.declineAcceptance())
      setSnackbarMessage("Cancelled registration")
      setSnackbarState("success")
      setSnackbarOpen(true)
    } catch (err) {
      console.error(err)
    }
    setDecliningAcceptance(false)
  }

  const dialogText = getDialogText(
    classes,
    applicationStatus,
    closeTimeStr,
    confirmTimeStr
  )
  const buttonBox = getButtonBox(
    classes,
    applicationStatus,
    resendVerification,
    setShowDeclineDialog
  )

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
          <Collapse in={loading}>
            <CircularProgress />
          </Collapse>
          {!loading && (
            <>
              <div>
                <Typography variant="h4" className={classes.statusHeaderText}>
                  Your Status:
                </Typography>
              </div>
              <div>
                <Typography variant="h4" className={classes.statusText}>
                  {applicationStatus}
                </Typography>
              </div>
              {dialogText}
              {buttonBox}
            </>
          )}
        </div>
        <Collapse in={sendingVerification}>
          <br />
          <CircularProgress />
        </Collapse>
      </div>
      <Dialog
        open={showDeclineDialog}
        onClose={() => {
          setShowDeclineDialog(false)
        }}
      >
        <DialogTitle className={classes.dialogHeader}>
          Cancel registration?
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Collapse in={decliningAcceptance}>
            <CircularProgress />
          </Collapse>
          <DialogContentText>
            Are you sure you want to cancel your registration for TartanHacks
            2022?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowDeclineDialog(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await declineAcceptance()
              setShowDeclineDialog(false)
              Router.reload()
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DashboardDialog
