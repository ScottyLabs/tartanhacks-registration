import { CircularProgress, Collapse, Typography } from "@mui/material"
import React, {
  ReactElement,
  useState,
  useEffect,
  Dispatch,
  SetStateAction
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import ContentHeader from "src/components/design/ContentHeader"
import FloatingDiv from "src/components/design/FloatingDiv"
import { RootState } from "types/RootState"
import Message from "./Message"
import styles from "./MessagesDialog.module.scss"

interface RequestData {
  seen: boolean
  _id: string
  type: string
}

const MessagesDialog = ({
  setSuccessMessage
}: {
  setSuccessMessage: Dispatch<SetStateAction<string>>
}): ReactElement => {
  const dispatch = useDispatch()
  const [requests, setRequests] = useState<any>([])
  const [seen, setSeen] = useState<Array<boolean>>([])
  const [notify, setNotify] = useState("")
  const [isCaptain, setIsCaptain] = useState(false)
  const user = useSelector((state: RootState) => state?.accounts?.data)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user === undefined) {
      return
    }

    const fetchRequests = async () => {
      setLoading(true)
      let captain = false
      try {
        const teamInfo = await dispatch(actions.user.getOwnTeam())
        captain = user._id === teamInfo.data.admin._id
      } catch (err) {
        console.error(err)
      }
      try {
        setIsCaptain(captain)
        const req = captain
          ? await dispatch(actions.requests.curTeamRequests())
          : await dispatch(actions.requests.curUserRequests())
        setRequests(req.data)
        setSeen(
          req.data.map((r: RequestData) => {
            return r.seen
          })
        )
        req.data.forEach(async (value: any) => {
          if (
            (captain && value.type === "JOIN") ||
            (!captain && value.type === "INVITE")
          ) {
            await dispatch(actions.requests.openRequest(value._id))
          }
        })
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    fetchRequests()
  }, [user])

  function handleRemove(id: number) {
    const newRequests = requests.filter((item: any) => item._id !== id)
    setRequests(newRequests)
  }

  let emptyMessage = null
  if (!loading && requests.length === 0) {
    emptyMessage = (
      <div className={styles.statusMessageContainer}>
        <Typography variant="body1" className={styles.noTeamsText}>
          You don&apos;t have any messages
        </Typography>
      </div>
    )
  }

  return (
    <FloatingDiv>
      <ContentHeader title="Messages" />
      <Collapse in={loading}>
        <div className={styles.spinnerContainer}>
          <CircularProgress />
        </div>
      </Collapse>
      <div className={styles.tableData}>
        {requests.map((request: any, idx: number) => (
          <Message
            key={idx}
            content={request}
            setSuccessMessage={setSuccessMessage}
            setNotify={setNotify}
            isNew={!seen[idx]}
            isCaptain={isCaptain}
            handleRemove={handleRemove}
          />
        ))}
        {emptyMessage}
      </div>
    </FloatingDiv>
  )
}

export default MessagesDialog
