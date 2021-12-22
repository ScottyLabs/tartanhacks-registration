import {
  Collapse,
  LinearProgress,
  Link,
  makeStyles,
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
    background: `linear-gradient(316.54deg, ${theme.palette.lightGradient.start} 35.13%, ${theme.palette.lightGradient.end} 126.39%)`,
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
    justifyContent: "center"
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
              href="https://play.google.com/store/apps/details?id=org.scottylabs.thdappfinal&hl=en_US&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
              target="_blank"
            >
              <Image
                alt="Get it on Google Play"
                src="/google-play-badge.png"
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
  applicationStatus: ApplicationStatus
): ReactElement => {
  if (applicationStatus === ApplicationStatus.VERIFIED) {
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
  const applicationStatus = getApplicationStatus(status)

  const dialogText = getDialogText(
    classes,
    applicationStatus,
    closeTimeStr,
    confirmTimeStr
  )
  const buttonBox = getButtonBox(classes, applicationStatus)

  return (
    <div className={classes.dialog}>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>
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
    </div>
  )
}

export default DashboardDialog
