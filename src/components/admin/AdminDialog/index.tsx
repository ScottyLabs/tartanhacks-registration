import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';
import FloatingDiv from 'src/components/design/FloatingDiv';
import AnalyticsTab from '../Analytics';
import Teams from '../Teams';
import ParticipantTable from '../ParticipantTable';
import RecruiterCreationForm from '../RecruiterCreationForm';
import SponsorCreationForm from '../SponsorCreationForm';
import CheckInTable from '../CheckInTable';
import styles from './index.module.scss';
import axios from 'axios';

const AdminDialog = (): ReactElement => {
	const [tabIndex, setTabIndex] = useState('0');

	useEffect(() => {
		const querySponsors = async () => {
			try {
				// await dispatch(actions.sponsors.list())
			} catch (err) {
				console.error(err);
			}
		};
		querySponsors();
	}, []);

  return (
    <div className={styles.dialog}>
      <FloatingDiv>
        <TabContext value={tabIndex}>
          <Box>
            <TabList
              onChange={(e, newIndex: string) => setTabIndex(newIndex)}
              className={styles.tabs}
              variant="scrollable"
              >
              <Tab label="Participants" value="0" />
              <Tab label="Recruiters" value="1" />
              <Tab label="Sponsors" value="2" />
              <Tab label="Analytics" value="3" />
            </TabList>
          </Box>
          <TabPanel value="0" className={styles.tabPanel}>
            <ParticipantTable />
          </TabPanel>
          <TabPanel value="1" className={styles.tabPanel}>
            <RecruiterCreationForm />
          </TabPanel>
          <TabPanel value="2" className={styles.tabPanel}>
            <SponsorCreationForm />
          </TabPanel>
          <TabPanel value="3" className={styles.tabPanel}>
            <AnalyticsTab />
          </TabPanel>
        </TabContext>
      </FloatingDiv>
    </div>
  )
}

export default AdminDialog;
