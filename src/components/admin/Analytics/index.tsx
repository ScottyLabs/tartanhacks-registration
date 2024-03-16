import {
	CircularProgress,
	Collapse,
	Snackbar,
	Typography,
} from '@mui/material';
import { Alert } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';
import { AnalyticsData } from 'src/_types/AnalyticsData';
import Demographics from './Demographics';
import styles from './index.module.scss';
import Stats from './Stats';

const Analytics = (): ReactElement => {
	const dispatch = useDispatch();

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [loading, setLoading] = useState(true);

	const [data, setData] = useState<AnalyticsData | undefined>();

	useEffect(() => {
		const getAnalytics = async () => {
			setLoading(true);
			try {
				const { data } = await dispatch(actions.analytics.get());
				setData(data);
			} catch (err: any) {
				setError(true);
				setErrorMessage(err.data);
			}
			setLoading(false);
		};
		getAnalytics();
	}, []);

	return (
		<div className={styles.container}>
			<Snackbar
				open={error}
				autoHideDuration={5000}
				onClose={(e) => setError(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
			<div className={styles.headerContainer}>
				<Typography variant="h4" className={styles.header}>
					Analytics
				</Typography>
			</div>
			<Collapse in={loading}>
				<div className={styles.spinnerContainer}>
					<CircularProgress />
				</div>
			</Collapse>
			<div className={styles.contents}>
				<Stats data={data} />
			</div>
			<div className={styles.contents}>
				<Demographics data={data} />
			</div>
		</div>
	);
};

export default Analytics;
