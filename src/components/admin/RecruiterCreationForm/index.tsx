import { Button, Snackbar, TextField, Typography } from '@mui/material';
import { Alert, Autocomplete } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';

interface Sponsor {
	name: string;
	_id: string;
}

const RecruiterCreationForm = (): ReactElement => {
	const dispatch = useDispatch();

	const sponsors: Sponsor[] =
		useSelector((state: RootState) => state.sponsors.data) || [];
	const [sponsorSelection, setSponsorSelection] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const checkSponsor = () => {
		if (sponsorSelection != '') {
			if (errorMessage === 'Sponsor not selected') {
				setError(false);
				setErrorMessage('');
			}
			return true;
		} else {
			setError(true);
			setErrorMessage('Sponsor not selected');
			return false;
		}
	};

	const checkEmail = () => {
		if (
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(email)
		) {
			if (errorMessage === 'Invalid email') {
				setError(false);
				setErrorMessage('');
			}
			return true;
		} else {
			setError(true);
			setErrorMessage('Invalid email');
			return false;
		}
	};

	const checkFirstName = () => {
		if (firstName != '') {
			if (errorMessage === 'Empty first name') {
				setError(false);
				setErrorMessage('');
			}
			return true;
		} else {
			setError(true);
			setErrorMessage('Empty first name');
			return false;
		}
	};

	const checkLastName = () => {
		if (lastName != '') {
			if (errorMessage === 'Empty last name') {
				setError(false);
				setErrorMessage('');
			}
			return true;
		} else {
			setError(true);
			setErrorMessage('Empty last name');
			return false;
		}
	};

	const checkFields = () => {
		return (
			checkSponsor() &&
			checkEmail() &&
			checkFirstName() &&
			checkLastName()
		);
	};

	const submitForm = async () => {
		try {
			await dispatch(
				actions.recruiters.create(
					sponsorSelection,
					email,
					firstName,
					lastName,
				),
			);
		} finally {
			setEmail('');
			setFirstName('');
			setLastName('');
		}
	};

	useEffect(() => {
		dispatch(actions.sponsors.list());
		// eslint-disable-next-line
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
			<form
				className={styles.applicationForm}
				onSubmit={async (e) => {
					e.preventDefault();
					if (checkFields()) {
						submitForm();
					}
				}}
			>
				<div className={styles.headerContainer}>
					<Typography variant="h4" className={styles.header}>
						Create Recruiter
					</Typography>
				</div>
				<div className={styles.formContents}>
					<TextField
						label="First Name"
						variant="outlined"
						required
						fullWidth
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
					/>
					<TextField
						label="Last Name"
						variant="outlined"
						required
						fullWidth
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}
					/>
					<TextField
						label="Email"
						variant="outlined"
						required
						fullWidth
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Autocomplete
						options={sponsors}
						key={'sponsors'}
						getOptionLabel={(option: any) => option.name}
						onChange={(e, selection) =>
							setSponsorSelection(
								selection ? selection._id.toString() : '',
							)
						}
						renderInput={(params) => (
							<TextField
								variant="outlined"
								{...params}
								label="Sponsor"
								required
							/>
						)}
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

export default RecruiterCreationForm;
