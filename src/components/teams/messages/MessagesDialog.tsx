import { CircularProgress, Collapse, makeStyles } from "@material-ui/core"
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

const useStyles = makeStyles((theme) => ({
  tableData: {
    tableLayout: "fixed",
    width: "100%",
    textAlign: "left",
    borderCollapse: "collapse",
    borderSpacing: "0 33px"
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center"
  }
}))

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
  const classes = useStyles()
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
        captain = user._id === teamInfo.data.admin
      } catch (err) {
        console.log(err)
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
          if (value.type != "JOIN") {
            await dispatch(actions.requests.openRequest(value._id))
          }
        })
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }

    fetchRequests()
  }, [user])

  function handleRemove(id: number) {
    const newRequests = requests.filter((item: any) => item.id !== id)
    setRequests(newRequests)
  }

  return (
    <FloatingDiv>
      <ContentHeader title="Messages" />
      <Collapse in={loading}>
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      </Collapse>
      <table className={classes.tableData}>
        <tbody>
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
        </tbody>
      </table>
    </FloatingDiv>
  )
}

export default MessagesDialog
