import { TextField, Typography, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { ConsentFields } from 'types/ApplicationForm';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';

const ConsentSection = ({
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

	// Consent
	const [tartanhacksCodeOfConduct, setTartanhacksCodeOfConduct] = useState<boolean>(false);
	const [mediaRelease, setMediaRelease] = useState<boolean>(false);
	const [signature, setSignature] = useState<string>('');
	const [signatureDate, setSignatureDate] = useState<Date>(new Date());
	const [mlhCodeOfConduct, setMlhCodeOfConduct] = useState<boolean>(false);
	const [mlhTerms, setMlhTerms] = useState<boolean>(false);
	const [mlhEmailUpdates, setMlhEmailUpdates] = useState<boolean>(false);

	const consentFields = useSelector((state: RootState) => state?.application?.consent)

	// Error fields
	const [consentHelper, setConsentHelper] = useState<string | null>(null);
	const [signatureHelper, setSignatureHelper] = useState<string | null>(null);

	const validateForm = async () => {
		let valid = false;

		const consents = [
			tartanhacksCodeOfConduct,
			mediaRelease,
			mlhCodeOfConduct,
			mlhTerms,
		]

		if (consents.includes(false)) {
			setConsentHelper('Please agree to all consents');
			valid = false;
		} else {
			setConsentHelper(null);
		}

		if (!signature.length) {
			setSignatureHelper('Please provide your signature');
			valid = false;
		} else {
			setSignatureHelper(null);
		}

		if (valid) {
			const data: ConsentFields = {
				tartanhacksCodeOfConduct,
				mediaRelease,
				signature,
				signatureDate,
				mlhCodeOfConduct,
				mlhTerms,
				mlhEmailUpdates,
			};

			await dispatch(actions.application.saveConsent(data));
		}

		setValid(true);
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
			setTartanhacksCodeOfConduct(consentFields.tartanhacksCodeOfConduct);
			setMediaRelease(consentFields.mediaRelease);
			setSignature(consentFields.signature);
			setSignatureDate(new Date(consentFields.signatureDate));
			setMlhCodeOfConduct(consentFields.mlhCodeOfConduct);
			setMlhTerms(consentFields.mlhTerms);
			setMlhEmailUpdates(consentFields.mlhEmailUpdates);
		}
		// eslint-disable-next-line
	}, [fetchedProfile]);

	return (
		<div className={styles.section}>
			<Typography variant="h5" className={styles.sectionHeader}>
				Consent
			</Typography>
			{consentHelper && (
				<Typography variant="body2" className={styles.error}>
					{consentHelper}
				</Typography>
			)}
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={mlhCodeOfConduct}
							checked={mlhCodeOfConduct}
							onChange={(e, checked) => setMlhCodeOfConduct(checked)}
						/>
					}
					label={<div>I have read and agree to the <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md">MLH Code of Conduct</a>*.</div>}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={mlhTerms}
							checked={mlhTerms}
							onChange={(e, checked) => setMlhTerms(checked)}
						/>
					}
					label={<div>I authorize TartanHacks to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">MLH Privacy Policy</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/blob/main/contest-terms.md">MLH Contest Terms and Conditions</a> and the <a href="https://github.com/MLH/mlh-policies/blob/main/privacy-policy.md">MLH Privacy Policy</a>.*</div>}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={mlhEmailUpdates}
							checked={mlhEmailUpdates}
							onChange={(e, checked) => setMlhEmailUpdates(checked)}
						/>
					}
					label={<div>I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.</div>}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={tartanhacksCodeOfConduct}
							checked={tartanhacksCodeOfConduct}
							onChange={(e, checked) => setTartanhacksCodeOfConduct(checked)}
						/>
					}
					label={<div>I agree to adhere to the <a href="https://docs.google.com/document/d/1_fNz533Ryzw2pYhi9YJe9RC8LMglMvADdta5cexjInI/edit?usp=sharing">TartanHacks Code of Conduct</a>.*</div>}
				/>
			</FormGroup>
			<FormGroup>
				<FormControlLabel
					control={
						<Checkbox
							value={mediaRelease}
							checked={mediaRelease}
							onChange={(e, checked) => setMediaRelease(checked)}
						/>
					}
					label={<div>I have read and agree to the <a href="https://docs.google.com/document/d/1TfD6YBXBUe4CIIBNDBNZozpO_wSaxzBFD-XSXk-lR3M">Media Release Form</a>.*</div>}
				/>
				<div className={styles.fieldRow}>
					<TextField
						label="Signature"
						value={signature}
						fullWidth
						helperText={signatureHelper}
						onChange={(e) => setSignature(e.target.value)}
						placeholder="Type your full legal signature"
					/>
					<TextField
						label="Date"
						type="date"
						fullWidth
						value={signatureDate?.toISOString().split('T')[0]}
						onChange={(e) => setSignatureDate(new Date(e.target.value))}
					/>
				</div>
			</FormGroup>
		</div>
	);
};

export default ConsentSection;
