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

const useStyles = makeStyles((theme) => ({
  tableData: {
    tableLayout: "fixed",
    width: "100%",
    textAlign: "left",
    borderCollapse: "collapse",
    borderSpacing: "0 33px"
  },
}))

const Messages = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector((state: RootState) => state?.requests?.error)
  const user = useSelector((state: RootState) => state?.accounts?.data)
  const [requests, setRequests] = useState<any>([])
  const classes = useStyles();

  useEffect(() => {
    if(user == undefined) {
      return;
    }
    const fetchRequests = async () => {
      if(user._id === undefined) {
        return;
      }
      
      try {
        console.log(user._id)
        const req = await dispatch(actions.requests.userRequests(user._id));
        setRequests(req.data);
      } catch (err) {
        console.error(err)
      }
    }

    fetchRequests()
  }, [user])
  console.log(requests)

  return (
    <>
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Messages" />
          <table className={classes.tableData}>
            <tbody>
              {requests.map((request : any, idx : any) => (
                <Message
                  key={idx}
                  isNew={true}
                  content={request}
                />
              ))}
            </tbody>
          </table>
        </FloatingDiv>
      </div>
    </>
  )
}

export default AuthenticatedLayout(Messages);