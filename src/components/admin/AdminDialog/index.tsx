import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';
import FloatingDiv from 'src/components/design/FloatingDiv';
import AnalyticsTab from '../Analytics';
import ParticipantTable from '../ParticipantTable';
import RecruiterCreationForm from '../RecruiterCreationForm';
import SponsorCreationForm from '../SponsorCreationForm';
import CheckInTable from '../CheckInTable';
import styles from './index.module.scss';

const AdminDialog = (): ReactElement => {
	const dispatch = useDispatch();
	const [tabIndex, setTabIndex] = useState('0');

	useEffect(() => {
		const querySponsors = async () => {
			try {
				await dispatch(actions.sponsors.list());
			} catch (err) {
				console.error(err);
			}
		};
		querySponsors();
	}, []);

	return (
		<FloatingDiv>
			<TabContext value={tabIndex}>
				<Box>
					<TabList
						value={tabIndex}
						onChange={(e, newIndex: string) =>
							setTabIndex(newIndex)
						}
						className={styles.tabs}
						variant="scrollable"
					>
						<Tab label="Participants" value="0" />
						<Tab label="Recruiters" value="1" />
						<Tab label="Sponsors" value="2" />
						<Tab label="Analytics" value="3" />
						<Tab label="Check-in Items" value="4" />
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
				<TabPanel value="4" className={styles.tabPanel}>
					<CheckInTable />
				</TabPanel>
			</TabContext>
		</FloatingDiv>
	);
};

export default AdminDialog;
