import { Hidden, makeStyles, Typography } from "@material-ui/core"
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
import RoundedButton from "src/components/design/RoundedButton";
import { PromiseProvider } from "mongoose";

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    },
  },
  nameDescriptionBox: {
    alignItems: "left",
    width: "40%"
  },
  description: {
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    paddingLeft: "5%",
    display: "block",
    width: "95%",
    wordWrap: "break-word"
  },
}))

const TeamDescription = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { teamId } = router.query;
  const [teamInfo, setTeamInfo] = useState<any>();
  const [loading, setLoading] = useState(true);
  const classes = useStyles()

  useEffect(() => {
    if (teamId == undefined) {
      return
    }

    const fetchTeamInfo = async () => {
      try {
        const info = await dispatch(actions.teams.getTeamInfo(teamId as string))
        setTeamInfo(info.data);
      } catch (err) {
        console.log(err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    fetchTeamInfo();
  }, [teamId])

  if (loading || teamInfo == undefined) {
    return <></>
  }
  console.log(teamInfo)

  return (
    <div>
      <ScottyLabsHeader />
      <WaveFooter />
      <FloatingDiv>
        <ContentHeader title="Team" />
        <div className={classes.nameDescriptionBox}>
          <Typography variant="h4" className={classes.header}>
              {teamInfo.name}
          </Typography>
          <Typography variant="subtitle1"
              className={classes.description}>
              {teamInfo.description}
            </Typography>
        </div>
      </FloatingDiv>
    </div>
  )
}

export default AuthenticatedLayout(TeamDescription);