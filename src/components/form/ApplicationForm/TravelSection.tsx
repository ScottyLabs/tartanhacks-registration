import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
	Typography
} from '@mui/material';
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { TravelFields } from 'types/ApplicationForm';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';

const TravelSection = ({
	validate,
	setValidate,
	setValid,
}: {
	validate: boolean;
	setValidate: Dispatch<SetStateAction<boolean>>;
	setValid: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
	const dispatch = useDispatch();

	const fetchedProfile = useSelector(
		(state: RootState) => state?.application?.fetchedProfile,
	);
	const travelFields =
		useSelector((state: RootState) => state?.application?.travel) ?? {};

	const [wantsTravelReimbursement, setWantsTravelReimbursement] = useState<boolean>(false);
	const [travelDetails, setTravelDetails] = useState<string>('');

	// Error fields
	const [travelInfoErrorStatus, setTravelInfoErrorStatus] = useState(false);
	const [travelInfoHelper, setTravelInfoHelper] = useState<string>('');

	const validateForm = async () => {
		const data: TravelFields = { wantsTravelReimbursement, travelDetails };
		await dispatch(actions.application.saveTravel(data));

		let valid = true;
		if (wantsTravelReimbursement && travelDetails.length === 0) {
			setTravelInfoErrorStatus(true);
			setTravelInfoHelper('Please provide travel details if you want to apply for travel reimbursement');
			valid = false;
		}

		setValid(valid);
		setValidate(false);
	};

	useEffect(() => {
		if (validate) {
			validateForm();
		}
		// eslint-disable-next-line
	}, [validate]);

	useEffect(() => {
		if (fetchedProfile) {
			setWantsTravelReimbursement(travelFields.wantsTravelReimbursement);
			setTravelDetails(travelFields.travelDetails ?? "");
		}
		// eslint-disable-next-line
	}, [fetchedProfile]);

	const maxChars = 100;

	return (
		<div className={styles.section}>
			<Typography variant="h5" className={styles.sectionHeader}>
				Travel
			</Typography>
			<Typography variant="body1">
				We will be providing travel reimbursements for a
				select number of hackers this year!
				<br />
				You must submit your application before Jan 3rd to be eligible,
				and we will notify you of your selection by Jan 10th.
				If selected, you must submit a project at TartanHacks to
				receive your reimbursement.
			</Typography>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={wantsTravelReimbursement}
							checked={wantsTravelReimbursement}
							onChange={(e, checked) => setWantsTravelReimbursement(checked)}
						/>
					}
					label="Would you like to apply for travel reimbursement?"
				/>
			</FormGroup>
			<Typography variant="body1">
				If you indicated that you would like to receive
				travel reimbursement, what mode of transportation
				would you prefer, and from where? (e.g. train from NYC)
			</Typography>
			<TextField
				label="Travel details"
				variant="outlined"
				error={travelInfoErrorStatus}
				helperText={travelInfoHelper}
				fullWidth
				multiline
				value={travelDetails}
				onChange={(e) => {
					setTravelDetails(e.target.value.slice(0, maxChars));
				}}
			/>
	</div>
	);
};

export default TravelSection;
