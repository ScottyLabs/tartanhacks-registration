import {
  Button, CircularProgress, Collapse, Dialog, DialogActions,
  DialogContent, DialogTitle, makeStyles, Snackbar, TextField, Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import BackButton from "src/components/design/BackButton"
import ContentHeader from "src/components/design/ContentHeader"
import FloatingDiv from "src/components/design/FloatingDiv"
import RectangleButton from "src/components/design/RectangleButton"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveFooter from "src/components/design/WaveFooter"
import Menu from "src/components/menu/Menu"
import { AuthenticatedLayout } from "src/layouts"
import { RootState } from "types/RootState"

//import new
import fetchData from "src/util/fetcher"
import { SSRDataAuth, TeamInfoData } from "types/SSRData"
import { Team } from "types/Team"

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: "30px",
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "20px"
    }
  },
  shortenedSubtitle: {
    width: "100%",
    paddingTop: "30px",
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "100%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "80%"
    }
  },
  content: {
    alignItems: "left"
  },
  subtitle: {
    paddingTop: "30px",
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
    width: "100%"
  },
  memberList: {
    listStyleType: "none",
    padding: 0,
    margin: 0
  },
  leaveButton: {
    width: "45%",
    fontSize: "30px",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "50px",
    borderRadius: "10px",
    background: theme.palette.primary.main,
    color: "#FFFFFF",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "25px",
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      width: "75%"
    }
  },
  editButton: {
    width: "100%",

    fontSize: "30px",
    fontWeight: 600,
    textTransform: "uppercase",
    marginTop: "50px",
    paddingLeft: "25px",
    paddingRight: "25px",
    borderRadius: "10px",
    background: theme.palette.primary.main,
    color: "#FFFFFF",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "25px",
      paddingRight: "50px",
      paddingLeft: "50px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      paddingRight: "25px",
      paddingLeft: "25px"
    }
  },
  buttonForm: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "center"
  },
  editableText: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  shortenedText: {
    width: "40%",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  longText: {
    width: "50%",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    }
  },
  editButtonForm: {
    display: "flex",
    alignItems: "center"
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)"
  },
  textFieldInput: {
    border: "none",
    color: theme.palette.gradient.start
  },
  dialogHeader: {
    color: theme.palette.gradient.start
  },
  backButton: {
    marginTop: "20px",
    alignSelf: "flex-start",
    fontSize: "24px",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "20px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    }
  },
  spinnerContainer: {
    marginTop: "1em",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}))

enum dialogOpen {
  No,
  Name,
  Description,
  Invite
}


export async function getServerSideProps(
  context: any
): Promise<SSRDataAuth<TeamInfoData>> {
  const accessToken: string = context.req.cookies["accessToken"]
  if (accessToken === undefined) {
    // not authenticated
    return {
      props: { isAuth: false }
    }
  }

  const router = useRouter()
  const { teamId } = router.query
  const promises = [
    fetchData(actions.auth.loginWithToken(), accessToken),
    fetchData(actions.teams.getTeamInfo(teamId as string), accessToken),
    fetchData(actions.user.getOwnTeam(), accessToken)
  ]

  try {
    const [userData, teamInfoData, ownTeamData] = await Promise.allSettled(promises)
    if (teamInfoData.status === "rejected") {
      console.error(teamInfoData.reason)
    }
    else if (userData.status === "rejected") {
      console.error(userData.reason)
    }
    else if (ownTeamData.status === "rejected") {
      console.error(ownTeamData.reason)
    }
    else {
      const info = teamInfoData.value
      const user = userData.value
      const teamInfo = info.data
      const isCaptain = info.data.admin._id === user.data._id
      const ownTeam = ownTeamData.value
      const isOwnTeam = ownTeam.data._id === (teamId as string)

      return {
        props: {
          isAuth: true,
          data: {
            teamInfo: teamInfo,
            isCaptain: isCaptain,
            user: user,
            isOwnTeam: isOwnTeam
          }
        }
      }
    }

  } catch (err) {
    console.error(err)
  }
  return {
    props: {
      isAuth: false
    }
  }
}


const TeamDescription = (props: SSRDataAuth<TeamInfoData>["props"]): ReactElement => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [teamInfo, setTeamInfo] = useState(props.data?.teamInfo ?? {
    _id: "",
    members: [],
    visible: true,
    event: "",
    name: "",
    description: "",
    admin: {},
    createdAt: "",
    updatedAt: "",
    __v: 0
  })
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const classes = useStyles()
  const errorMessage = useSelector((state: RootState) => state?.teams?.error)
  const user = useSelector((state: RootState) => state?.accounts?.data)
  const [open, setOpen] = useState(dialogOpen.No)
  const [invitations, setInvitations] = useState<any>([])
  const [changedName, setChangedName] = useState(props.data?.teamInfo?.name ?? "")
  const [changedDescription, setChangedDescription] = useState(props.data?.teamInfo?.description ?? "")
  const [loading, setLoading] = useState(true)

  //check if the user is authenticated or not
  if (!props.isAuth){
    router.push("/login")
  }


  const handleClose = () => {
    setOpen(dialogOpen.No)
    setChangedName(teamInfo.name)
    setChangedDescription(teamInfo.description)
    setInvitations([])
  }

  const handleCloseName = async () => {
    setOpen(dialogOpen.No)
    setLoading(true)
    try {
      dispatch(
        actions.teams.editTeamInfo(changedName, undefined, undefined)
      )
      setTeamInfo({
        ...teamInfo,
        name: changedName
      })
    } catch (err) {
      setNotify("error")
    }
    setLoading(false)
  }

  const handleCloseDescription = async () => {
    setOpen(dialogOpen.No)
    setLoading(true)
    try {
      dispatch(
        actions.teams.editTeamInfo(undefined, changedDescription, undefined)
      )
      setTeamInfo({
        ...teamInfo,
        description: changedDescription
      })
    } catch (err) {
      setNotify("error")
    }
    setLoading(false)
  }

  const handleCloseInvite = async () => {
    setOpen(dialogOpen.No)
    setLoading(true)
    if (invitations) {
      invitations.forEach(async (elem: string) => {
        try {
          dispatch(actions.teams.inviteByEmail(elem))
        } catch (err) {
          setNotify("error")
        }
      })
    }
    setLoading(false)
  }

  return (
    <>
      <Menu />
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          {!props.data?.isOwnTeam ? (
            <BackButton link="/teams" className={classes.backButton} />
          ) : null}
          <div className={classes.spinnerContainer}>
            <Collapse in={loading}>
              <CircularProgress />
            </Collapse>
          </div>
          <ContentHeader title="Team" />
          <div className={classes.content}>
            <div className={classes.editableText}>
              <div className={classes.shortenedText}>
                <Typography variant="h4" className={classes.title}>
                  TEAM NAME
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  {teamInfo.name}
                </Typography>
              </div>
              {props.data?.isCaptain ? (
                <form
                  className={classes.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Name)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={classes.editButton}>
                    EDIT TEAM NAME
                  </RectangleButton>
                </form>
              ) : null}
            </div>
            <div className={classes.editableText}>
              <div className={classes.longText}>
                <Typography variant="h4" className={classes.title}>
                  TEAM DESCRIPTION
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  {teamInfo.description}
                </Typography>
              </div>
              {props.data?.isCaptain ? (
                <form
                  className={classes.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Description)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={classes.editButton}>
                    EDIT DESCRIPTION
                  </RectangleButton>
                </form>
              ) : null}
            </div>
            <div className={classes.editableText}>
              <div className={classes.shortenedText}>
                <Typography variant="h4" className={classes.title}>
                  TEAM MEMBERS
                </Typography>
                <ul className={classes.memberList}>
                  {teamInfo.members.map((member: any, idx: number) => (
                    <li key={idx}>
                      <Typography
                        variant="subtitle1"
                        className={classes.shortenedSubtitle}
                      >
                        {`${member.firstName} ${member.lastName} (${member.email})`}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              {props.data?.isCaptain ? (
                <form
                  className={classes.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Invite)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={classes.editButton}>
                    INVITE NEW MEMBERS
                  </RectangleButton>
                </form>
              ) : null}
            </div>
          </div>
          {props.data?.isOwnTeam ? (
            <form
              className={classes.buttonForm}
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  await dispatch(actions.teams.leaveTeam())
                  router.push("/teams")
                } catch (err) {
                  setNotify("error")
                }
              }}
            >
              <RectangleButton type="submit" className={classes.leaveButton}>
                LEAVE TEAM
              </RectangleButton>
            </form>
          ) : null}
        </FloatingDiv>
        <Snackbar
          open={notify != ""}
          autoHideDuration={5000}
          onClose={(e) => setNotify("")}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={notify === "error" ? "error" : "success"}>
            {notify == "error" ? errorMessage : successMessage}
          </Alert>
        </Snackbar>

        <Dialog open={open === dialogOpen.Name} onClose={handleClose}>
          <DialogTitle className={classes.dialogHeader}>
            Edit Team Name
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              value={changedName}
              className={classes.textField}
              placeholder="Your team's name"
              InputProps={{
                className: classes.textFieldInput,
                classes: { notchedOutline: classes.textFieldInput }
              }}
              onChange={(e) => {
                setChangedName(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCloseName}>OK</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open === dialogOpen.Description} onClose={handleClose}>
          <DialogTitle className={classes.dialogHeader}>
            Edit Team Description
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              value={changedDescription}
              className={classes.textField}
              placeholder="Your team's description"
              InputProps={{
                className: classes.textFieldInput,
                classes: { notchedOutline: classes.textFieldInput }
              }}
              onChange={(e) => {
                setChangedDescription(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCloseDescription}>OK</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={open === dialogOpen.Invite} onClose={handleClose}>
          <DialogTitle className={classes.dialogHeader}>
            Invite New Members
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              className={classes.textField}
              multiline
              placeholder={
                "e.g. user@example.com\n        teammate@tartanhacks.cmu.edu"
              }
              InputProps={{
                className: classes.textFieldInput,
                classes: { notchedOutline: classes.textFieldInput }
              }}
              onChange={(e) => {
                setInvitations(
                  e.target.value.match(
                    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9._-]+)/gi
                  )
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCloseInvite}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default TeamDescription
