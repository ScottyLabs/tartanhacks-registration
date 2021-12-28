import {
  Collapse,
  LinearProgress,
  makeStyles,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "../design/RectangleButton"
import HeaderUnderline from "../design/HeaderUnderline"
import { useRouter } from "next/router"

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
    backdropFilter: "blur(4px)"
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  dialogText: {
    marginBottom: "1em",
    color: `${theme.palette.gradient.start}`
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
  }
}))

const ConfirmationDialog = (): ReactElement => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [loading, setLoading] = useState(false)

  const [signatureLiability, setSignatureLiability] = useState(false)
  const [signaturePhotoRelease, setSignaturePhotoRelease] = useState(false)
  const [signatureCodeOfConduct, setSignatureCodeOfConduct] = useState(false)
  const [mlhCodeOfConduct, setMlhCodeOfConduct] = useState(false)
  const [mlhEventLogistics, setMlhEventLogistics] = useState(false)
  const [mlhPromotional, setMlhPromotional] = useState(false)

  const signatureLiabilityText = "Signature liability place holder.*"
  const signaturePhotoReleaseText = "Signature photo release place holder.*"
  const signatureCodeOfConductText = "Signature code of conduct place holder.*"
  const mlhCodeOfConductText = "MLH Code of Conduct place holder.*"
  const mlhEventLogisticsText = "MLH Event Logistics place holder."
  const mlhPromotionalText = "MLH promotional place holder."

  useEffect(() => {
    dispatch(actions.auth.login())
  }, [])

  const confirm = async () => {
    setLoading(true)
    try {
      await dispatch(
        actions.user.confirm(
          signatureLiability,
          signaturePhotoRelease,
          signatureCodeOfConduct,
          mlhCodeOfConduct,
          mlhEventLogistics,
          mlhPromotional
        )
      )
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
    router.push("/")
  }

  return (
    <div className={classes.dialog}>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          confirm()
        }}
      >
        <div className={classes.dialogContent}>
          <div className={classes.headerContainer}>
            <Typography variant="h4" className={classes.header}>
              Confirmation
            </Typography>
          </div>
          <div className={classes.dialogText}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={signatureLiability}
                    onChange={(e) => setSignatureLiability(e.target.checked)}
                  />
                }
                label={signatureLiabilityText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={signaturePhotoRelease}
                    onChange={(e) => setSignaturePhotoRelease(e.target.checked)}
                  />
                }
                label={signaturePhotoReleaseText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={signatureCodeOfConduct}
                    onChange={(e) =>
                      setSignatureCodeOfConduct(e.target.checked)
                    }
                  />
                }
                label={signatureCodeOfConductText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    checked={mlhCodeOfConduct}
                    onChange={(e) => setMlhCodeOfConduct(e.target.checked)}
                  />
                }
                label={mlhCodeOfConductText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mlhEventLogistics}
                    onChange={(e) => setMlhEventLogistics(e.target.checked)}
                  />
                }
                label={mlhEventLogisticsText}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mlhPromotional}
                    onChange={(e) => setMlhPromotional(e.target.checked)}
                  />
                }
                label={mlhPromotionalText}
              />
            </FormGroup>
          </div>
          <RectangleButton type="submit">CONFIRM</RectangleButton>
        </div>
      </form>
    </div>
  )
}

export default ConfirmationDialog
