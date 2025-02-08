import { Button, Snackbar, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import actions from 'src/actions';
import styles from './index.module.scss';

const JudgeCreationForm = (): ReactElement => {
	const dispatch = useDispatch();

	const [judges, setJudges] = useState('');
	const [loading, setLoading] = useState(false);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [success, setSuccess] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const createJudges = async () => {
		setLoading(true);
		try {
			const emails = judges.split('\n').filter((line) => line != '');
			if (emails.length == 0) {
				setError(true);
				setErrorMessage('Please enter at least one judge!');
			} else {
				setSuccess(false);
				await dispatch(actions.user.addJudges(emails));
				setSuccessMessage('Created judges!');
				setSuccess(true);
			}
		} catch (err: any) {
			setError(true);
			setErrorMessage(err.data);
		}
		setLoading(false);
	};

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
			<Snackbar
				open={success}
				autoHideDuration={5000}
				onClose={(e) => setSuccess(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity="success">{successMessage}</Alert>
			</Snackbar>
			<form
				className={styles.applicationForm}
				onSubmit={async (e) => {
					e.preventDefault();
					createJudges();
				}}
			>
				<div className={styles.headerContainer}>
					<Typography variant="h4" className={styles.header}>
						Create Judge
					</Typography>
				</div>
				<div className={styles.formContents}>
					<Typography variant="body2">
						If creating multiple judges at once, put
						each email on a new line
					</Typography>
					<TextField
						label="Judges"
						multiline
						minRows={4}
						value={judges}
						onChange={(e) => setJudges(e.target.value)}
					/>
					<div className={styles.buttonContainer}>
						<Button type="submit" variant="outlined">
							Submit
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default JudgeCreationForm;
