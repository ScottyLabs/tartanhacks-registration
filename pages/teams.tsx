import {
  makeStyles,
  Typography,
  Snackbar,
  CircularProgress,
  Collapse
} from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useRouter } from "next/dist/client/router"
import { AuthenticatedLayout } from "src/layouts"
import WaveFooter from "src/components/design/WaveFooter"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import RoundedButton from "src/components/design/RoundedButton"
import FloatingDiv from "src/components/design/FloatingDiv"
import TeamTableEntry from "src/components/teams/TeamTableEntry"
import ContentHeader from "src/components/design/ContentHeader"
import { Alert } from "@material-ui/lab"
import Menu from "src/components/menu/Menu"
import { RootState } from "types/RootState"

const useStyles = makeStyles((theme) => ({
  newTeamButton: {
    width: "45%",
    fontSize: "30px",
    fontWeight: 600,
    alignSelf: "center",
    textTransform: "uppercase",
    borderRadius: "10px",
    background: theme.palette.gradient.end,
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
  tableHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "35px"
  },
  tableBody: {
    display: "grid"
  },
  tableData: {
    tableLayout: "fixed",
    width: "100%",
    textAlign: "left",
    borderCollapse: "separate",
    borderSpacing: "0 33px"
  },
  tableEntry: {
    display: "block",
    width: "100%"
  },
  tableHeaderText: {
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
  link: {
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer"
  },
  buttonForm: {
    display: "inline-flex",
    justifyContent: "center"
  },
  statusMessageContainer: {
    display: "flex",
    justifyContent: "center"
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center"
  },
  noTeamsText: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: "25px",
    textAlign: "center",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "20px",
      width: "80%",
      paddingBottom: "20px"
    }
  }
}))

const ViewTeams = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [teams, setTeams] = useState<Array<any>>([])
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const classes = useStyles()

  const errorMessage = useSelector((state: RootState) => state?.teams?.error)
  const [loading, setLoading] = useState(false)

  const checkJoinErrorCallback = (isError: boolean) => {
    setNotify(isError ? "error" : "success")
    if (!isError) {
      setSuccessMessage("Join request sent successfully")
    }
  }

  useEffect(() => {
    const getTeams = async () => {
      setLoading(true)
      try {
        const ownTeam = await dispatch(actions.user.getOwnTeam())
        router.push("/teams/details/" + ownTeam.data._id)
      } catch (err) {
        try {
          const viewTeams = await dispatch(actions.teams.viewTeams())
          setTeams(viewTeams.data)
        } catch (err) {
          console.error(err)
        }
      }
      setLoading(false)
    }
    getTeams()
  }, [])

  let emptyMessage = null
  if (!loading && teams.length === 0) {
    emptyMessage = (
      <div className={classes.statusMessageContainer}>
        <Typography variant="body1" className={classes.noTeamsText}>
          There are no open teams
        </Typography>
      </div>
    )
  }

  return (
    <>
      <Menu />
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Team" />
          <form
            className={classes.buttonForm}
            onClick={async (e) => {
              e.preventDefault()
              router.push("/teams/create")
            }}
          >
            <RoundedButton type="submit" className={classes.newTeamButton}>
              Create new team
            </RoundedButton>
          </form>
          <Collapse in={loading}>
            <div className={classes.spinnerContainer}>
              <CircularProgress />
            </div>
          </Collapse>
          <div className={classes.tableHeader}>
            <Typography variant="h4" className={classes.tableHeaderText}>
              VIEW OPEN TEAMS
            </Typography>
          </div>
          {emptyMessage}
          <table className={classes.tableData}>
            <tbody>
              {teams.map((team, idx) => (
                <TeamTableEntry
                  team={team}
                  key={idx}
                  callback={checkJoinErrorCallback}
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
            {notify == "error" ? errorMessage : successMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default AuthenticatedLayout(ViewTeams)
