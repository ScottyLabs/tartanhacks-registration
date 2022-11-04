import {
  CircularProgress,
  Collapse,
  makeStyles,
  Snackbar,
  Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { AxiosError } from "axios"
import { useRouter } from "next/dist/client/router"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import actions from "src/actions"
import ContentHeader from "src/components/design/ContentHeader"
import FloatingDiv from "src/components/design/FloatingDiv"
import RectangleButton from "src/components/design/RectangleButton"
import ScottyLabsHeader from "src/components/design/ScottyLabsHeader"
import WaveFooter from "src/components/design/WaveFooter"
import Menu from "src/components/menu/Menu"
import TeamTableEntry from "src/components/teams/TeamTableEntry"
import { isAuthenticated } from "src/util/auth"
import { getFetcher } from "src/util/fetcher"
import { RootState } from "types/RootState"
import { SSRDataAuth, TeamData } from "types/SSRData"
import { Team } from "types/Team"

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

/**
 * get a user's team (if exists, else null), and, if the user has not team,
 * the list of all teams.
 *
 * returns null if the user is unauthenticated.
 * @param context the context should include the accessToken cookie
 * (for authenticated users)
 */
export async function getServerSideProps(
  context: any
): Promise<SSRDataAuth<TeamData>> {
  const accessToken: string = context.req.cookies["accessToken"]
  if (accessToken === undefined) {
    // not authenticated
    return {
      props: { isAuth: false }
    }
  }
  // prevents exception from being thrown if the user is not in a team
  const ownTeamOrNull = async () => {
    try {
      // get user's team
      const ownTeam = (await getFetcher(
        actions.user.getOwnTeam(),
        accessToken
      )) as Team
      // if no exception thrown, then the user has a team
      return ownTeam
    } catch (error) {
      return null
    }
  }
  try {
    const [ownTeam, teams] = await Promise.all([
      ownTeamOrNull(),
      getFetcher(actions.teams.viewTeams(), accessToken) as Promise<Array<Team>>
    ])
    if (ownTeam !== null) {
      // has a team
      return {
        props: {
          isAuth: true,
          data: {
            isInTeam: true,
            ownTeam: ownTeam
          }
        }
      }
    }
    // doesn't have a team - return list of teams
    return {
      props: {
        isAuth: true,
        data: {
          isInTeam: false,
          teams: teams
        }
      }
    }
  } catch (error) {
    // request to /teams failed
    if((error as AxiosError).isAxiosError === true && (error as AxiosError).response?.status === 403) {
      // not authenticated
      return {
        props: { isAuth: false }
      }
    }
    // some unexpected error - redirect to 500 page
    throw error
  }
}

export default function ViewTeams(props: SSRDataAuth<TeamData>["props"]) {
  const router = useRouter()
  const [notify, setNotify] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  const errorMessage = useSelector((state: RootState) => state?.teams?.error)

  const teams = props.data?.teams ?? []

  const checkJoinErrorCallback = (isError: boolean) => {
    setNotify(isError ? "error" : "success")
    if (!isError) {
      setSuccessMessage("Join request sent successfully")
    }
  }

  useEffect(() => {
    setLoading(true)
    if (!props.isAuth) {
      // if user is not authenticated, redirect to login
      router.push("/login")
    } else if (props.data?.isInTeam) {
      // open team page if user is in a team
      router.push("/teams/details/" + props.data.ownTeam!._id)
    } else {
      setLoading(false)
    }
  }, [])

  if (!props.isAuth) {
    // don't show UI if the user is unauthenticated (before the redirect)
    return <></>
  }
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
          {!loading ? (
            <form
              className={classes.buttonForm}
              onClick={async (e) => {
                e.preventDefault()
                router.push("/teams/create")
              }}
            >
              <RectangleButton type="submit" className={classes.newTeamButton}>
                Create new team
              </RectangleButton>
            </form>
          ) : null}
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
          open={notify === "error" || notify === "success"}
          autoHideDuration={5000}
          onClose={(e) =>
            setNotify(notify === "error" ? "error_close" : "success_close")
          }
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            severity={
              notify === "error" || notify === "error_close"
                ? "error"
                : "success"
            }
          >
            {notify == "error" || notify === "error_close"
              ? errorMessage
              : successMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}
