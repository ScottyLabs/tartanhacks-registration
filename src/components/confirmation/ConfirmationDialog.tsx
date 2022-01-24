import {
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  Link,
  makeStyles,
  Typography
} from "@material-ui/core"
import { Launch } from "@material-ui/icons"
import { useTheme } from "@material-ui/styles"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "../design/RectangleButton"

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
  },
  link: {
    color: theme.palette.text.primary
  }
}))

const ConfirmationDialog = (): ReactElement => {
  const router = useRouter()
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [loading, setLoading] = useState(false)

  const [signatureLiability, setSignatureLiability] = useState(false)
  const [signatureCodeOfConduct, setSignatureCodeOfConduct] = useState(false)
  const [willMentor, setWillMentor] = useState(false)

  const confirm = async () => {
    setLoading(true)
    try {
      await dispatch(
        actions.user.confirm(
          signatureLiability,
          signatureCodeOfConduct,
          willMentor
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
                label={
                  <Typography>
                    I agree with the{" "}
                    <Link
                      target="_blank"
                      href="/THLiabilityWaiver.pdf"
                      className={classes.link}
                    >
                      TartanHacks Liability Waiver
                    </Link>
                    .*
                  </Typography>
                }
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
                label={
                  <Typography>
                    I agree with the{" "}
                    <Link
                      target="_blank"
                      href="/THCodeOfConduct.pdf"
                      className={classes.link}
                    >
                      TartanHacks Code of Conduct
                    </Link>
                    .*
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={willMentor}
                    onChange={(e) => setWillMentor(e.target.checked)}
                  />
                }
                label="Are you willing to help other hackers as a mentor?"
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
