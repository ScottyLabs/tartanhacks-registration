import { TextField, Typography } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { WorkPermission } from "enums/Profile"
import { ObjectId } from "mongodb"
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { WorkAuthorizationFields } from "types/ApplicationForm"
import { RootState } from "types/RootState"
import styles from "./index.module.scss"

interface Sponsor {
  name: string
  _id: string
}

const WorkAuthorizationSection = ({
  validate,
  setValidate,
  setValid
}: {
  validate: boolean
  setValidate: Dispatch<SetStateAction<boolean>>
  setValid: Dispatch<SetStateAction<boolean>>
}): ReactElement => {
  const dispatch = useDispatch()

  const fetchedProfile = useSelector(
    (state: RootState) => state?.application?.fetchedProfile
  )
  const workAuthFields =
    useSelector((state: RootState) => state?.application?.workAuth) ?? {}

  // Work Authorization
  const sponsors: Sponsor[] =
    useSelector((state: RootState) => state.sponsors.data) || []
  const sponsorMap: { [key: string]: Sponsor } = {}
  for (const sponsor of sponsors) {
    sponsorMap[sponsor._id] = sponsor
  }

  const [workPermission, setWorkPermission] = useState<WorkPermission | null>(
    null
  )
  const [workLocation, setWorkLocation] = useState<string>("")
  const [workStrengths, setWorkStrengths] = useState<string>("")
  const [sponsorRanking, setSponsorRanking] = useState<Sponsor[]>([])

  const validateForm = async () => {
    const sponsorRankingIds = sponsorRanking.map((sponsor) => sponsor._id)
    const data: WorkAuthorizationFields = {
      workPermission: workPermission as WorkPermission,
      workLocation,
      workStrengths,
      sponsorRanking: sponsorRankingIds
    }
    await dispatch(actions.application.saveWorkAuth(data))
    setValid(true)
    setValidate(false)
  }

  useEffect(() => {
    if (validate) {
      validateForm()
    }
    // eslint-disable-next-line
  }, [validate])

  useEffect(() => {
    if (fetchedProfile) {
      setWorkPermission(workAuthFields?.workPermission ?? null)
      setWorkLocation(workAuthFields?.workLocation ?? "")
      setWorkStrengths(workAuthFields?.workStrengths ?? "")

      const sponsorRankingPopulated = workAuthFields?.sponsorRanking?.map(
        (sponsorId) => sponsorMap[sponsorId]
      )
      setSponsorRanking(sponsorRankingPopulated)
    }
    // eslint-disable-next-line
  }, [fetchedProfile])

  useEffect(() => {
    dispatch(actions.sponsors.list())
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.section}>
      <Typography variant="h5" className={styles.sectionHeader}>
        Sponsor Information
      </Typography>
      <Autocomplete
        options={Object.values(WorkPermission)}
        value={workPermission}
        onChange={(e, value) => setWorkPermission(value)}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="US Work Authorization"
          />
        )}
      />
      <TextField
        label="Work Location Preferences"
        variant="outlined"
        fullWidth
        value={workLocation}
        onChange={(e) => {
          setWorkLocation(e.target.value)
        }}
      />
      <TextField
        label="Relevant Skills"
        variant="outlined"
        fullWidth
        value={workStrengths}
        onChange={(e) => {
          setWorkStrengths(e.target.value)
        }}
      />
      {/* <Autocomplete
        multiple
        value={sponsorRanking}
        options={sponsors}
        getOptionLabel={(option: any) => option.name}
        onChange={(e, ranking: Sponsor[]) => setSponsorRanking(ranking)}
        getOptionDisabled={(options) => sponsorRanking.length >= 5}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Rank Sponsors (Top 5)"
          />
        )}
      /> */}
    </div>
  )
}

export default WorkAuthorizationSection
