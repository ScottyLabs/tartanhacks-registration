import { Box, makeStyles, Tab } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import ParticipantTable from "./ParticipantTable"
import RecruiterCreationForm from "./RecruiterCreationForm"
import SponsorCreationForm from "./SponsorCreationForm"

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: "80%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    paddingTop: "1em",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 227, 227, 0.7565) 
    35.13%, rgba(255, 255, 255, 0.85) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: "3em"
    },
    marginTop: "10em",
    flexDirection: "column"
  },
  tabs: {
    width: "100%"
  },
  tabPanel: {
    width: "100%"
  }
}))

const AdminDialog = (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [tabIndex, setTabIndex] = useState("0")

  useEffect(() => {
    const querySponsors = async () => {
      try {
        await dispatch(actions.sponsors.list())
      } catch (err) {
        console.error(err)
      }
    }
    querySponsors()
  }, [])

  return (
    <div className={classes.dialog}>
      <TabContext value={tabIndex}>
        <Box>
          <TabList
            value={tabIndex}
            onChange={(e, newIndex: string) => setTabIndex(newIndex)}
            className={classes.tabs}
          >
            <Tab label="Participants" value="0" />
            <Tab label="Recruiters" value="1" />
            <Tab label="Sponsors" value="2" />
            <Tab label="Analytics" value="3" />
          </TabList>
        </Box>
        <TabPanel value="0" className={classes.tabPanel}>
          <ParticipantTable />
        </TabPanel>
        <TabPanel value="1" className={classes.tabPanel}>
          <RecruiterCreationForm />
        </TabPanel>
        <TabPanel value="2" className={classes.tabPanel}>
          <SponsorCreationForm />
        </TabPanel>
        <TabPanel value="3" className={classes.tabPanel}></TabPanel>
      </TabContext>
    </div>
  )
}

export default AdminDialog
