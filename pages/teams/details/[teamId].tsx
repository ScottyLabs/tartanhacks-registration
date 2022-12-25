import {
  Typography,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Collapse,
  CircularProgress
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import { AuthenticatedLayout } from "src/layouts"
import WaveFooter from "src/components/design/WaveFooter"
import FloatingDiv from "src/components/design/FloatingDiv"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import ContentHeader from "src/components/design/ContentHeader"
import RectangleButton from "src/components/design/RectangleButton"
import { useSelector } from "react-redux"
import { RootState } from "types/RootState"
import { Alert } from "@material-ui/lab"
import Menu from "src/components/menu/Menu"
import BackButton from "src/components/design/BackButton"
import styles from "styles/ViewTeam.module.scss"

enum dialogOpen {
  No,
  Name,
  Description,
  Invite
}

const TeamDescription = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { teamId } = router.query
  const [teamInfo, setTeamInfo] = useState({
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
  const [ownTeamFetched, setOwnTeamFetched] = useState(false)
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isOwnTeam, setIsOwnTeam] = useState(false)
  const errorMessage = useSelector((state: RootState) => state?.teams?.error)
  const user = useSelector((state: RootState) => state?.accounts?.data)
  const [isCaptain, setIsCaptain] = useState(false)
  const [open, setOpen] = useState(dialogOpen.No)
  const [changedName, setChangedName] = useState("")
  const [changedDescription, setChangedDescription] = useState("")
  const [invitations, setInvitations] = useState<any>([])

  const [loading, setLoading] = useState(true)

  const handleClose = () => {
    setOpen(dialogOpen.No)
    setChangedName(teamInfo.name)
    setChangedDescription(teamInfo.description)
    setInvitations([])
  }

  const handleCloseName = async () => {
    setOpen(dialogOpen.No)
    try {
      await dispatch(
        actions.teams.editTeamInfo(changedName, undefined, undefined)
      )
      setTeamInfo({
        ...teamInfo,
        name: changedName
      })
    } catch (err) {
      setNotify("error")
    }
  }

  const handleCloseDescription = async () => {
    setOpen(dialogOpen.No)
    try {
      await dispatch(
        actions.teams.editTeamInfo(undefined, changedDescription, undefined)
      )
      setTeamInfo({
        ...teamInfo,
        description: changedDescription
      })
    } catch (err) {
      setNotify("error")
    }
  }

  const handleCloseInvite = async () => {
    setOpen(dialogOpen.No)
    if (invitations) {
      invitations.forEach(async (elem: string) => {
        try {
          await dispatch(actions.teams.inviteByEmail(elem))
        } catch (err) {
          setNotify("error")
        }
      })
    }
  }

  useEffect(() => {
    if (teamId === undefined || user._id === undefined) {
      setLoading(false)
      return
    }

    const fetchTeamInfo = async () => {
      setLoading(true)
      const promises = [
        dispatch(actions.teams.getTeamInfo(teamId as string)),
        dispatch(actions.user.getOwnTeam())
      ]
      try {
        setOwnTeamFetched(false)
        const [teamInfoData, ownTeamData] = await Promise.allSettled(promises)
        if (teamInfoData.status === "rejected") {
          console.error(teamInfoData.reason)
        } else {
          const info = teamInfoData.value
          setTeamInfo(info.data)
          setChangedName(info.data.name)
          setChangedDescription(info.data.description)
          setIsCaptain(info.data.admin._id === user._id)
        }

        if (ownTeamData.status === "rejected") {
          setIsOwnTeam(false)
        } else {
          const ownTeam = ownTeamData.value
          setIsOwnTeam(ownTeam.data._id === (teamId as string))
        }
        setOwnTeamFetched(true)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    fetchTeamInfo()
  }, [teamId, user])
  return (
    <>
      <Menu />
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          {ownTeamFetched && !isOwnTeam ? (
            <BackButton link="/teams" className={styles.backButton} />
          ) : null}
          <div className={styles.spinnerContainer}>
            <Collapse in={loading}>
              <CircularProgress />
            </Collapse>
          </div>
          <ContentHeader title="Team" />
          <div className={styles.content}>
            <div className={styles.editableText}>
              <div className={styles.shortenedText}>
                <Typography variant="h4" className={styles.title}>
                  TEAM NAME
                </Typography>
                <Typography variant="subtitle1" className={styles.subtitle}>
                  {teamInfo.name}
                </Typography>
              </div>
              {isCaptain ? (
                <form
                  className={styles.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Name)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={styles.editButton}>
                    EDIT TEAM NAME
                  </RectangleButton>
                </form>
              ) : null}
            </div>
            <div className={styles.editableText}>
              <div className={styles.longText}>
                <Typography variant="h4" className={styles.title}>
                  TEAM DESCRIPTION
                </Typography>
                <Typography variant="subtitle1" className={styles.subtitle}>
                  {teamInfo.description}
                </Typography>
              </div>
              {isCaptain ? (
                <form
                  className={styles.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Description)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={styles.editButton}>
                    EDIT DESCRIPTION
                  </RectangleButton>
                </form>
              ) : null}
            </div>
            <div className={styles.editableText}>
              <div className={styles.shortenedText}>
                <Typography variant="h4" className={styles.title}>
                  TEAM MEMBERS
                </Typography>
                <ul className={styles.memberList}>
                  {teamInfo.members.map((member: any, idx: number) => (
                    <li key={idx}>
                      <Typography
                        variant="subtitle1"
                        className={styles.shortenedSubtitle}
                      >
                        {`${member.firstName} ${member.lastName} (${member.email})`}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
              {isCaptain ? (
                <form
                  className={styles.editButtonForm}
                  onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                      setOpen(dialogOpen.Invite)
                    } catch (err) {
                      setNotify("error")
                    }
                  }}
                >
                  <RectangleButton type="submit" className={styles.editButton}>
                    INVITE NEW MEMBERS
                  </RectangleButton>
                </form>
              ) : null}
            </div>
          </div>
          {isOwnTeam ? (
            <form
              className={styles.buttonForm}
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
              <RectangleButton type="submit" className={styles.leaveButton}>
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
          <DialogTitle className={styles.dialogHeader}>
            Edit Team Name
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              value={changedName}
              className={styles.textField}
              placeholder="Your team's name"
              InputProps={{
                className: styles.textFieldInput
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
          <DialogTitle className={styles.dialogHeader}>
            Edit Team Description
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              value={changedDescription}
              className={styles.textField}
              placeholder="Your team's description"
              InputProps={{
                className: styles.textFieldInput
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
          <DialogTitle className={styles.dialogHeader}>
            Invite New Members
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="outlined"
              fullWidth={true}
              className={styles.textField}
              multiline
              placeholder={
                "e.g. user@example.com\n        teammate@tartanhacks.cmu.edu"
              }
              InputProps={{
                className: styles.textFieldInput
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

export default AuthenticatedLayout(TeamDescription)
