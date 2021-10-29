import { Hidden, makeStyles, Typography, Snackbar } from "@material-ui/core"
import React, {
  ReactElement,
  FunctionComponent,
  useEffect,
  useState
} from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux";
import actions from "src/actions";
import { AuthenticatedLayout } from "src/layouts";
import WaveFooter from "src/components/design/WaveFooter";
import FloatingDiv from "src/components/design/FloatingDiv";
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader";
import ContentHeader from "src/components/design/ContentHeader";
import { Alert } from "@material-ui/lab"
import RoundedButton from "src/components/design/RoundedButton";

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
      fontSize: "20px",
    },
  },
  shortenedSubtitle: {
    width: "40%",
    paddingTop: "30px",
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "100%"
    },
  },
  content: {
    alignItems: "left",
  },
  subtitle: {
    paddingTop: "30px",
    fontWeight: 400,
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
      width: "60%",
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
      width: "75%",
    }
  },
  ButtonForm: {
    display: "inline-flex",
    justifyContent: "center"
  }
}))

const TeamDescription = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { teamId } = router.query;
  const [teamInfo, setTeamInfo] = useState<any>();
  const [fetchError, setFetchError] = useState(false);
  const [leaveError, setLeaveError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOwnTeam, setIsOwnTeam] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    if (teamId == undefined) {
      return
    }

    const fetchTeamInfo = async () => {
      try {
        const info = await dispatch(actions.teams.getTeamInfo(teamId as string))
        setTeamInfo(info.data);
        const ownTeam = await dispatch(actions.user.getOwnTeam());
        setIsOwnTeam(ownTeam.data._id === (teamId as string))
      } catch (err) {
        setFetchError(true);
      } finally {
        setLoading(false);
        return;
      }
    }

    fetchTeamInfo();
  }, [teamId])

  if (loading) {
    return <></>
  }
  if (fetchError) {
    return (
      <Snackbar open={true}>
        <Alert severity="error">
          Cannot get the details for the team!
        </Alert>
      </Snackbar>
    )
  }

  return (
    <>
      <div>
        <ScottyLabsHeader />
        <WaveFooter />
        <FloatingDiv>
          <ContentHeader title="Team" />
          <div className={classes.content}>
            <Typography variant="h4" className={classes.title}>
              TEAM NAME
            </Typography>
            <Typography variant="subtitle1" className={classes.shortenedSubtitle}>
              {teamInfo.name}
            </Typography>
            <Typography variant="h4" className={classes.title}>
              TEAM DESCRIPTION
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle}>
              {teamInfo.description}
            </Typography>
            <Typography variant="h4" className={classes.title}>
              TEAM MEMBERS
            </Typography>
          </div>
          <ul className={classes.memberList}>
            {teamInfo.members.map((member: any, idx: number) =>
              <li key={idx}>
                <Typography variant="subtitle1" className={classes.shortenedSubtitle}>
                  {`${member.firstName} ${member.lastName} (${member.email})`}
                </Typography>
              </li>)}
          </ul>
          {isOwnTeam ?
          <form className={classes.ButtonForm} onSubmit={ async (e) => {
            e.preventDefault();
            try {
              await dispatch(actions.teams.leaveTeam());
              router.push('/teams');
            } catch (err) {
              setLeaveError(true);
            }
          }}>
            <RoundedButton type="submit" className={classes.leaveButton}>
              LEAVE TEAM
            </RoundedButton>
          </form> :
            null
          }
        </FloatingDiv>
      </div>
    </>
  )
}

export default AuthenticatedLayout(TeamDescription);