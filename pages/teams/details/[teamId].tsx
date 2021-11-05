import { makeStyles, Typography } from "@material-ui/core"
import React, {
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
import RoundedButton from "src/components/design/RoundedButton";
import Notification from "src/components/design/Notification";
import { useSelector } from "react-redux";
import { RootState } from "types/RootState";

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
  buttonForm: {
    display: "inline-flex",
    justifyContent: "center"
  }
}))

const TeamDescription = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { teamId } = router.query;
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
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [isOwnTeam, setIsOwnTeam] = useState(false)
  const classes = useStyles()
  const errorMessage = useSelector((state: RootState) => state?.teams?.error)

  useEffect(() => {
    if (teamId == undefined) {
      return
    }

    const fetchTeamInfo = async () => {
      try {
        const info = await dispatch(actions.teams.getTeamInfo(teamId as string))
        setTeamInfo(info.data);
      } catch (err) {
        setNotify({
          isOpen: true,
          message: "",
          type: 'error'
        })
      } finally {
        try {
          const ownTeam = await dispatch(actions.user.getOwnTeam());
          setIsOwnTeam(ownTeam.data._id === (teamId as string))
        } catch (err) {
          setIsOwnTeam(false);
          setNotify({
            isOpen: true,
            message: "",
            type: 'error'
          })
        }
      }
    }

    fetchTeamInfo();
  }, [teamId])

  if(notify.type === "error") {
    notify.message = errorMessage
  }
  
  console.log(teamInfo)
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
            <form className={classes.buttonForm} onSubmit={async (e) => {
              e.preventDefault();
              try {
                await dispatch(actions.teams.leaveTeam());
                router.push('/teams');
              } catch (err) {
                setNotify({
                  isOpen: true,
                  message: "",
                  type: "error"
                })
                //TODO: leave error processing
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
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}

export default AuthenticatedLayout(TeamDescription);