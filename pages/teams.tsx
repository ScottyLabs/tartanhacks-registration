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
import WaveHeader from "src/components/design/WaveHeader"
import ScottyLabsLogo from "src/components/design/ScottyLabsLogo"
import ScottyLabsIcon from "src/components/design/ScottyLabsIcon"
import EnvelopeEmpty from "src/components/design/EnvelopeEmpty"
import RoundedButton from "src/components/design/RoundedButton"

const useStyles = makeStyles((theme) => ({
  teamListDiv: {
    position: "relative",
    top: "20%",
    width: "77.639%",
    margin: "auto",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 255, 255, 0.85) 
                      35.13%, rgba(255, 227, 227, 0.7565) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    borderRadius: "25px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "92.754%",
      top: "15%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "92.754%",
      top: "15%"
    }
  },
  teamList: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "76.834%",
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
    width: "45.294%",
    height: "10.109%",
    fontSize: "30px",
    lineHeight: "45px",
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
      lineHeight: "25px",
      width: "60%",
      height: "56px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      lineHeight: "17px",
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
    lineHeight: "45px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      lineHeight: "17px",
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
    width: "26.565%",
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
  tableEntryButton: {
    width: "100%",
    fontSize: "30px",
    fontWeight: 600,
    textAlign: "center",
    textTransform: "uppercase",
    borderRadius: "10px",
    background: theme.palette.gradient.end,
    color: "#FFFFFF",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "20px",
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      height: "56px"
    },
  },
  teamNameCell: {
    width: "50%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "40%",
      height: "100%"
    },
  },
  viewDetailCell: {
    width: "30%"
  },
  teamName: {
    height: "100%",
  },
  joinButton: {
    paddingRight: "15px",
    textAlign: "right",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      lineHeight: "17px",
    },
  },
  description: {
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    lineHeight: "30px",
    paddingLeft: "27px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      height: "0%"
    },
  },
  tableHeaderText: {
    fontWeight: 400,
    backgroundColor: theme.palette.gradient.start,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: "28px",
    lineHeight: "42px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "20px",
      lineHeight: "30px"
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
    left: "2.917%",
    top: "4.097%",
    whiteSpace: "nowrap",
    width: "42.569%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "81.643%"
    },
  },
}))



const TableEntry = (props: any) => {
  return (
    <tr>
      <td className={props.classes.teamNameCell}>
        <div className={props.classes.teamName}>
          <Typography noWrap variant="h4" className={props.classes.header}>
            {props.teamName}
          </Typography>
          <Hidden xsDown> 
          <Typography noWrap variant="subtitle1"
            className={props.classes.description}>
            {props.description}
          </Typography>
          </Hidden>
        </div>
      </td>
      <td className={props.classes.joinButton}>
        <RoundedButton type="submit" className={props.classes.tableEntryButton}
        onClick = {async () => {
          
        }}>
          Join
        </RoundedButton>
      </td>
      <td className={props.classes.viewDetailCell}>
        <RoundedButton type="submit" className={props.classes.tableEntryButton}>
          View Detail
        </RoundedButton>
      </td>
    </tr>
  )
}
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
        //  setTeams([{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"testaaaaaaaaaaaaaaaaa",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //   name:"test",
        //   description: "test"
        // },{
        //    name:"test",
        //    description: "test"
        //  },{
        //   name:"test",
        //   description: "test"
        // },])
      } catch (err) {
        console.log(err)
        router.push('/login');
      }
    }
    getTeams();
  }, [])

  return (
    <div>
      <ScottyLabsLogo className={classes.pageHeader}/>
      <WaveFooter />
      <div className={classes.teamListDiv}>
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
              {teams.map((team, idx) => <TableEntry
                teamName={team.name}
                classes={classes}
                className={classes.tableEntry}
                description={team.description} key={idx} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedLayout(ViewTeams);
