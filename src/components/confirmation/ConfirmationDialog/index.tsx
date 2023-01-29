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
} from "@mui/material"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import RectangleButton from "src/components/design/RectangleButton"
import styles from "./index.module.scss"
import { RootState } from "types/RootState"
import { DateTime } from "luxon"

const ConfirmationDialog = (): ReactElement => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [signatureLiability, setSignatureLiability] = useState(false)
  const [signatureCodeOfConduct, setSignatureCodeOfConduct] = useState(false)
  const [willMentor, setWillMentor] = useState(false)

  const confirmTime = useSelector(
    (state: RootState) => state?.settings?.confirmTime
  )
  const confirmTimeDt = DateTime.fromJSDate(confirmTime)
  const curDt = DateTime.now()

  const isLate = curDt > confirmTimeDt

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
    <div className={styles.dialog}>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>
      {isLate ? (
        <Typography
          style={{
            color: "red"
          }}
        >
          Sorry, the confirmation deadline has passed.
        </Typography>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            confirm()
          }}
        >
          <div className={styles.dialogContent}>
            <div className={styles.headerContainer}>
              <Typography variant="h4" className={styles.header}>
                Confirmation
              </Typography>
            </div>
            <div className={styles.dialogText}>
              <FormGroup className={styles.formGroup}>
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
                        className={styles.link}
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
                        className={styles.link}
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
      )}
    </div>
  )
}

export default ConfirmationDialog
