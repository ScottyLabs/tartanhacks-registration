import { Hidden, makeStyles, Typography } from "@material-ui/core"
import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useRouter } from "next/dist/client/router"
import { AuthenticatedLayout } from "src/layouts";
import { viewTeams } from "src/actions/teams"
import WaveFooter from "src/components/design/WaveFooter"
import ScottyLabsLogo from "src/components/design/ScottyLabsLogo"
import EnvelopeEmpty from "src/components/design/EnvelopeEmpty"
import RoundedButton from "src/components/design/RoundedButton"
import FloatingDiv from "src/components/design/FloatingDiv"
import TeamTableEntry from "src/components/teams/TeamTableEntry"

const useStyles = makeStyles((theme) => ({
  teamList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "80%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    },
    flexDirection: "column",
    gap: "1em",
  },
  scottyContainer: {
    zIndex: -1,
    opacity: 0.3,
    bottom: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "end"
  },
  scottyIcon: {
    position: "relative",
    width: "50%",
    bottom: 0,
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "100%"
    }
  },
  newTeamButton: {
    width: "45%",
    height: "10%",
    fontSize: "30px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    textTransform: "uppercase",
    borderRadius: "10px",
    background: theme.palette.gradient.end,
    color: "#FFFFFF",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "25px",
      width: "60%",
      height: "56px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      width: "60%",
      height: "56px"
    }
  },
  headerDiv: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    paddingTop: "42px"
  },
  header: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    },
  },
  envelope: {
    paddingTop: "42px",
    width: "64px",
    position: "absolute",
    right: "0",
    top: "0%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "42px"
    },
  },
  hrDivider: {
    width: "25%",
    border: 0,
    height: "1px",
    borderTop: `1px solid ${theme.palette.gradient.start}`,
  },
  tableHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "35px",
  },
  tableBody: {
    display: "grid",
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
    width: "100%",
  },
  tableHeaderText: {
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
  link: {
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer"
  },
  pageHeader: {
    position: "absolute",
    left: "3%",
    top: "4%",
    whiteSpace: "nowrap",
    width: "45%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "80%"
    },
  },
}))

const ViewTeams = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [teams, setTeams] = useState([{
    name: "",
    description: ""
  }])
  const classes = useStyles()

  useEffect(() => {
    const getTeams = async () => {
      try {
        const viewTeams = await dispatch(actions.teams.viewTeams());
        setTeams(viewTeams.data);
      } catch (err) {
        console.log(err)
        router.push('/login');
      }
    }
    getTeams();
  }, [])

  return (
    <div>
      <ScottyLabsLogo className={classes.pageHeader} />
        <WaveFooter />
      <FloatingDiv>
        <div className={classes.teamList}>
          <div className={classes.headerDiv}>
            <Typography variant="h4" className={classes.header}>
              Team
            </Typography>
            <EnvelopeEmpty className={classes.envelope} />
          </div>
          <hr className={classes.hrDivider} />
          <RoundedButton type="submit" className={classes.newTeamButton}>
            Create new team
          </RoundedButton>
          <div className={classes.tableHeader}>
            <Typography variant="h4" className={classes.tableHeaderText}>
              VIEW OPEN TEAMS
            </Typography>
            <button className={classes.link} onClick={
              (e) => {
                console.log("filtered");
              }
            }>
              <Typography variant="h4" className={classes.tableHeaderText}>
                Filter
              </Typography>
            </button>
          </div>
          <table className={classes.tableData}>
            <tbody>
              {teams.map((team, idx) => <TeamTableEntry
                team={team} key={idx} />)}
            </tbody>
          </table>
        </div>
      </FloatingDiv>
    </div>
  )
}

export default AuthenticatedLayout(ViewTeams);
