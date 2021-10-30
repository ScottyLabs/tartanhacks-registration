import { Hidden, makeStyles, Typography, Snackbar } from "@material-ui/core"
import actions from "src/actions";
import RoundedButton from "src/components/design/RoundedButton";
import { useRouter } from "next/dist/client/router"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  teamNameCell: {
    width: "50%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "40%",
      height: "100%"
    },
  },
  name: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
    },
  },
  description: {
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    paddingLeft: "5%",
    width: "95%",
    right: "27px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      height: "0%"
    },
  },
  joinButton: {
    paddingRight: "15px",
    textAlign: "right",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px",
    },
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
  viewDetailCell: {
    width: "30%"
  },
}))

const TeamTableEntry = (props: any) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  return (
    <>
      <tr>
        <td className={classes.teamNameCell}>
          <div>
            <Typography noWrap variant="h4" className={classes.name}>
              {props.team.name}
            </Typography>
            <Hidden xsDown>
              <Typography noWrap variant="subtitle1"
                className={classes.description}>
                {props.team.description}
              </Typography>
            </Hidden>
          </div>
        </td>
        <td className={classes.joinButton}>
          <form onSubmit={async (e) => {
            e.preventDefault()
            try {
              await dispatch(actions.teams.joinTeamRequest(props.team._id));
              router.push('/');
            } catch (err) {
              setError(true);
              props.callback(true);
              console.log(err)
            }
          }}>
            <RoundedButton type="submit" className={classes.tableEntryButton}>
              Join
            </RoundedButton>
          </form>
        </td>
        <td className={classes.viewDetailCell}>
          <form onSubmit={(e) => {
            e.preventDefault();
            router.push('/teams/details/' + props.team._id)
          }}>
            <RoundedButton type="submit" className={classes.tableEntryButton}>
              View Detail
            </RoundedButton>
          </form>
        </td>
      </tr>
    </>
  )
}

export default TeamTableEntry;