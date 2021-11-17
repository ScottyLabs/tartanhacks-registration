import { useState } from "react"
import { makeStyles, Typography, TextField, Snackbar } from "@material-ui/core"
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
import { Alert } from "@material-ui/lab"

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
      fontSize: "20px"
    }
  },
  content: {
    alignItems: "left"
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
    }
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
      width: "60%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      width: "75%"
    }
  },
  textField: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)"
  },
  textFieldInput: {
    border: "none",
    color: theme.palette.gradient.start
  }
}))

const TeamCreate = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const classes = useStyles()
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [addMembers, setAddMembers] = useState<any>([])
  const [error, setError] = useState(false)
  const errorMessage = useSelector((state: RootState) => state?.teams?.error)

  return (
    <>
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Create New Team" longTitle="true" />
          <div className={classes.content}>
            <Typography variant="h4" className={classes.title}>
              BASIC INFO
            </Typography>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  await dispatch(
                    actions.teams.createTeam(teamName, teamDescription)
                  )
                  if (addMembers) {
                    addMembers.forEach(async (elem: string) => {
                      try {
                        await dispatch(actions.teams.inviteByEmail(elem))
                      } catch (err) {
                        setError(true)
                      }
                    })
                  }
                  router.push("/teams")
                } catch (err) {
                  setError(true)
                }
              }}
            >
              <Typography variant="subtitle1" className={classes.annotation}>
                Team Name*
              </Typography>
              <TextField
                required
                variant="outlined"
                fullWidth={true}
                value={teamName}
                className={classes.textField}
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
              <TextField
                required
                variant="outlined"
                fullWidth={true}
                value={teamDescription}
                className={classes.textField}
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
              <TextField
                variant="outlined"
                fullWidth={true}
                className={classes.textField}
                InputProps={{
                  className: classes.textFieldInput,
                  classes: { notchedOutline: classes.textFieldInput }
                }}
                onChange={(e) => {
                  setAddMembers(
                    e.target.value.match(
                      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9._-]+)/gi
                    )
                  )
                }}
              />
              <RoundedButton type="submit" className={classes.createButton}>
                CREATE NEW TEAM
              </RoundedButton>
            </form>
          </div>
        </FloatingDiv>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={(e) => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </>
  )
}

export default AuthenticatedLayout(TeamCreate)