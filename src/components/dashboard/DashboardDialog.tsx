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
  Snackbar,
  Typography
} from "@material-ui/core"
import { Computer } from "@material-ui/icons"
import { Alert } from "@material-ui/lab"
import { Status, statusToString } from "enums/Status"
import { DateTime } from "luxon"
import Image from "next/image"
import NextLink from "next/link"
import Router from "next/router"
import { ReactElement, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { RootState } from "types/RootState"
import RectangleButton from "../design/RectangleButton"
import styles from "styles/DashboardDialog.module.scss"

const getDialogText = (
  status: Status,
  closeTime: string,
  confirmTime: string
): ReactElement => {
  if (status === Status.VERIFIED) {
    return (
      <>
        <div className={styles.dialogText}>
          <Typography variant="body1">
            You still need to complete your application!
          </Typography>
        </div>
        <div className={styles.dialogText}>
          <Typography variant="body1">
            If you do not complete your application by
            <br />
            <span className={styles.deadline}>{closeTime}</span>, you will not
            be admitted!
          </Typography>
        </div>
      </>
    )
  } else if (status == Status.COMPLETED_PROFILE) {
    return (
      <>
        <div className={styles.dialogText}>
          <Typography variant="body1">Welcome back!</Typography>
        </div>
        <div className={styles.dialogText}>
          <Typography variant="body1">
            You can edit your information until
            <br />
            <span className={styles.deadline}>{confirmTime}</span>
          </Typography>
        </div>
      </>
    )
  } else if (status === Status.ADMITTED) {
    return (
      <>
        <div className={styles.dialogText}>
          <Typography variant="body1">Welcome to Tartanhacks!</Typography>
          <Typography variant="body1">
            Please confirm your attendance by
          </Typography>
          <span className={styles.deadline}>{confirmTime}</span>
        </div>
      </>
    )
  } else if (status === Status.REJECTED) {
    return (
      <>
        <div className={styles.dialogText}>
          <Typography variant="body1">
            Thanks for applying! We were unable to accommodate you this year.
            Please apply again next year!
          </Typography>
        </div>
      </>
    )
  } else if (status === Status.CONFIRMED) {
    return (
      <>
        <div className={styles.dialogText}>
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
            Once you&apos;re all set, download our Dashboard App!
          </Typography>
          <div className={styles.appStoreLinks}>
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
  } else if (status === Status.DECLINED) {
    return (
      <>
        <div className={styles.dialogText}>
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
  status: Status,
  resendVerification: () => Promise<void>,
  setShowDeclineDialog: (b: boolean) => void
): ReactElement => {
  if (status === Status.UNVERIFIED) {
    return (
      <RectangleButton type="button" onClick={() => resendVerification()}>
        RESEND VERIFICATION EMAIL
      </RectangleButton>
    )
  } else if (status === Status.VERIFIED) {
    return (
      <Link href="/apply" className={styles.link}>
        <RectangleButton type="submit">
          COMPLETE YOUR APPLICATION
        </RectangleButton>
      </Link>
    )
  } else if (status === Status.COMPLETED_PROFILE) {
    return (
      <div className={styles.buttonBox}>
        <Link href="/apply" className={styles.link}>
          <RectangleButton type="submit">EDIT APPLICATION</RectangleButton>
        </Link>
      </div>
    )
  } else if (status === Status.ADMITTED) {
    return (
      <div className={styles.buttonBox}>
        <Link href="/confirmation" className={styles.link}>
          <RectangleButton type="submit">CONFIRM</RectangleButton>
        </Link>
        <div className={styles.buttonSpacer}></div>
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
    useSelector((state: RootState) => state?.accounts?.data?.status) ?? null
  const statusStr = statusToString(status)
  const email =
    useSelector((state: RootState) => state?.accounts?.data?.email) || ""

  const loading = status === null

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

  const dialogText = getDialogText(status, closeTimeStr, confirmTimeStr)
  const buttonBox = getButtonBox(
    status,
    resendVerification,
    setShowDeclineDialog
  )

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbarState}>{snackbarMessage}</Alert>
      </Snackbar>
      <div className={styles.dialog}>
        <div className={styles.dialogContent}>
          <Collapse in={loading}>
            <CircularProgress />
          </Collapse>
          {!loading && (
            <>
              <div>
                <Typography variant="h4" className={styles.statusHeaderText}>
                  Your Status:
                </Typography>
              </div>
              <div>
                <Typography variant="h4" className={styles.statusText}>
                  {statusStr}
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
        <DialogTitle className={styles.dialogHeader}>
          Cancel registration?
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
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
