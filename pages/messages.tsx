import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveFooter from "src/components/design/WaveFooter"
import FloatingDiv from "src/components/design/FloatingDiv"
import ContentHeader from "src/components/design/ContentHeader"
import { useSelector } from "react-redux"
import { RootState } from "types/RootState"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import { AuthenticatedLayout } from "src/layouts"
import { makeStyles } from "@material-ui/styles"
import Message from "src/components/design/messages/Message"
import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import createPalette from "@material-ui/core/styles/createPalette"

const useStyles = makeStyles((theme) => ({
  tableData: {
    tableLayout: "fixed",
    width: "100%",
    textAlign: "left",
    borderCollapse: "collapse",
    borderSpacing: "0 33px"
  },
}))

interface RequestData {
  seen: Boolean,
  _id: string,
  type: string
}

const Messages = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state: RootState) => state?.requests?.error)
  const [requests, setRequests] = useState<any>([])
  const [seen, setSeen] = useState<Array<Boolean>>([])
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isCaptain, setIsCaptain] = useState(false)
  const classes = useStyles();
  const user = useSelector((state: RootState) => state?.accounts?.data)

  useEffect(() => {
    if (user === undefined) {
      return
    }

    const fetchRequests = async () => {
      let captain = false;
      try {
        const teamInfo = await dispatch(actions.user.getOwnTeam())
        captain = user._id === teamInfo.data.admin
      } catch (err) {}
      try {
        console.log(captain)
        setIsCaptain(captain)
        const req = captain ?
          await dispatch(actions.requests.curTeamRequests()) :
          await dispatch(actions.requests.curUserRequests());
        setRequests(req.data);
        setSeen(req.data.map((r: RequestData) => {
          return r.seen
        }))
        req.data.forEach(async (value: any) => {
          if (value.type != "JOIN") {
            await dispatch(actions.requests.openRequest(value._id))
          }
        })
      } catch (err) {
        console.log(err)
      }
    }

    fetchRequests()
  }, [user])

  function handleRemove(id: number) {
    const newRequests = requests.filter((item: any) => item.id !== id);
    setRequests(newRequests);
  }

  return (
    <>
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Messages" />
          <table className={classes.tableData}>
            <tbody>
              {
                requests.map((request: any, idx: number) => (
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
        <Snackbar
          open={notify != ""}
          autoHideDuration={5000}
          onClose={(e) => setNotify("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={notify === "error" ? "error" : "success"}>
            {notify === "error" ? errorMessage : successMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default AuthenticatedLayout(Messages);
