import { Box, makeStyles, Tab } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import ParticipantTable from "./ParticipantTable"
import RecruiterCreationForm from "./RecruiterCreationForm"
import SponsorCreationForm from "./SponsorCreationForm"
import AnalyticsTab from "./Analytics"
import FloatingDiv from "src/components/design/FloatingDiv"

const useStyles = makeStyles((theme) => ({
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
    <FloatingDiv>
      <TabContext value={tabIndex}>
        <Box>
          <TabList
            value={tabIndex}
            onChange={(e, newIndex: string) => setTabIndex(newIndex)}
            className={classes.tabs}
            variant="scrollable"
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
        <TabPanel value="3" className={classes.tabPanel}>
          <AnalyticsTab />
        </TabPanel>
      </TabContext>
    </FloatingDiv>
  )
}

export default AdminDialog
