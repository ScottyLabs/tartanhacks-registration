import { useState } from "react"
import { makeStyles, Typography, TextField } from "@material-ui/core"
import { AuthenticatedLayout } from "src/layouts"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveFooter from "src/components/design/WaveFooter"
import FloatingDiv from "src/components/design/FloatingDiv"
import ContentHeader from "src/components/design/ContentHeader"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import RoundedButton from "src/components/design/RoundedButton"
import actions from "src/actions"
import { useSelector } from "react-redux"
import { RootState } from "types/RootState"
import Notification from "src/components/design/Notification"

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: "30px",
    fontWeight: 400,
    backgroundColor: theme.palette.gradient.start,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "28px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "20px",
    },
  },
  content: {
    alignItems: "left",
  },
  annotation: {
    paddingTop: "30px",
    paddingBottom: "10px",
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
    width: "80%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "100%"
    },
  },
  memberList: {
    listStyleType: "none",
    padding: 0,
    margin: 0
  },
  createButton: {
    width: "45%",
    fontSize: "30px",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "50px",
    borderRadius: "10px",
    background: theme.palette.primary.main,
    color: "#FFFFFF",
    padding: "20px",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "25px",
      width: "60%",
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      width: "75%",
    }
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)",
  },
  textFieldInput: {
    border: "none",
    color: theme.palette.gradient.start
  }
}))

const TeamCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [addMembers, setAddMembers] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: ""
  })
  const errorMessage = useSelector((state: RootState) => state?.teams?.error)

  if(notify.type === "error") {
    notify.message = errorMessage
  }

  return (
    <>
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Create New Team" longTitle="true"/>
          <div className={classes.content}>
            <Typography variant="h4" className={classes.title}>
              BASIC INFO
            </Typography>
            <form onSubmit = { async (e) => {
              e.preventDefault();
              console.log(addMembers.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9._-]+)/gi))
              try {
                await dispatch(actions.teams.createTeam(teamName, teamDescription));
                router.push("/teams");
              } catch (err) {
                setNotify({
                  isOpen: true,
                  message: "",
                  type: "error"
                })
              }
            }}>
              <Typography variant="subtitle1" className={classes.annotation}>
                Team Name*
              </Typography>
              <TextField required variant="outlined" fullWidth={true}
                value={teamName} className={classes.textField}
                InputProps={{
                  className: classes.textFieldInput,
                  classes: { notchedOutline: classes.textFieldInput }
                }}
                onChange={(e) => {
                  setTeamName(e.target.value)
                }}
              />

              <Typography variant="subtitle1" className={classes.annotation}>
                Team Description*
              </Typography>
              <TextField required variant="outlined" fullWidth={true}
                value={teamDescription} className={classes.textField}
                InputProps={{
                  className: classes.textFieldInput,
                  classes: { notchedOutline: classes.textFieldInput }
                }}
                onChange={(e) => {
                  setTeamDescription(e.target.value)
                }}
              />

              <Typography variant="subtitle1" className={classes.annotation}>
                Invite New Member
              </Typography>
              <TextField variant="outlined" fullWidth={true}
                value={addMembers} className={classes.textField}
                InputProps={{
                  className: classes.textFieldInput,
                  classes: { notchedOutline: classes.textFieldInput }
                }}
                onChange={(e) => {
                  setAddMembers(e.target.value)
                }}
              />
              <RoundedButton type="submit" className={classes.createButton}>
              CREATE NEW TEAM
            </RoundedButton>
            </form>
          </div>
        </FloatingDiv>
      </div>
      <Notification 
      notify={notify}
      setNotify={setNotify}
      />
    </>
  )
}

export default AuthenticatedLayout(TeamCreate)