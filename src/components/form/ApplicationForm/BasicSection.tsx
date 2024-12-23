import { TextField, Typography, FormGroup } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Ethnicity, Gender } from 'enums/Profile';
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { BasicFields } from 'types/ApplicationForm';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';
import { getCountries } from 'src/util/getCountries';

const BasicSection = ({
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
	const basicFields =
		useSelector((state: RootState) => state?.application?.basic) ?? {};

	// Basic information
	const [displayName, setDisplayName] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [middleName, setMiddleName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [gender, setGender] = useState<Gender | null>(null);
	const [genderOther, setGenderOther] = useState<string>('');
	const [ethnicity, setEthnicity] = useState<Ethnicity | null>(null);
	const [ethnicityOther, setEthnicityOther] = useState<string>('');
	const [age, setAge] = useState<string>('');
	const [city, setCity] = useState<string>('');
	const [country, setCountry] = useState<string | null>(null);

	// Error fields
	const [displayNameErrorStatus, setDisplayNameErrorStatus] = useState(false);
	const [ageErrorStatus, setAgeErrorStatus] = useState(false);
	const [ageHelper, setAgeHelper] = useState<string>('');
	const [displayNameHelper, setDisplayNameHelper] = useState<string>(
		'Your display name is used in your leaderboard ranking',
	);

	const validateForm = async () => {
		let valid = true;
		const { data: displayNameAvailable } = await dispatch(
			actions.application.checkDisplayName(displayName),
		);
		if (!displayNameAvailable) {
			setDisplayNameErrorStatus(true);
			setDisplayNameHelper(
				'That display name is taken. Please choose something else',
			);
			valid = false;
		} else {
			setDisplayNameErrorStatus(false);
			setDisplayNameHelper(
				'Your display name is used in your leaderboard ranking',
			);
		}

		const ageNum = parseInt(age);
		if (age && (ageNum < 0 || isNaN(ageNum))) {
			valid = false;
			setAgeErrorStatus(true);
			setAgeHelper('Please enter a valid age');
		} else if (age && ageNum < 18) {
			valid = false;
			setAgeErrorStatus(true);
			setAgeHelper('You must be at least 18 years old to apply');
		} else {
			setAgeErrorStatus(false);
			setAgeHelper('');
		}

		if (valid) {
			const data: BasicFields = {
				displayName,
				firstName,
				lastName,
				gender: gender as Gender,
				ethnicity: ethnicity as Ethnicity,
				middleName,
				city,
				country: country as string,
			};

			data.age = ageNum;
			if (gender === Gender.OTHER) {
				data.genderOther = genderOther;
			}
			if (ethnicity == Ethnicity.OTHER) {
				data.ethnicityOther = ethnicityOther;
			}

			await dispatch(actions.application.saveBasic(data));
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

	const [countries, setCountries] = useState<string[]>([]);

	useEffect(() => {
		const queryCountries = async () => {
			const countriesList = await getCountries();
			setCountries(countriesList);
		};
		queryCountries();
	}, []);

	useEffect(() => {
		if (fetchedProfile) {
			setDisplayName(basicFields?.displayName);
			setFirstName(basicFields?.firstName);
			setMiddleName(basicFields?.middleName ?? '');
			if (basicFields?.age) {
				setAge(String(basicFields?.age));
			}
			setLastName(basicFields?.lastName);
			setGender(basicFields?.gender);
			setGenderOther(basicFields?.genderOther ?? '');
			setEthnicity(basicFields?.ethnicity);
			setEthnicityOther(basicFields?.ethnicityOther ?? '');
			setCity(basicFields?.city ?? '');
			setCountry(basicFields?.country ?? '');
		}
		// eslint-disable-next-line
	}, [fetchedProfile]);

	return (
		<div className={styles.section}>
			<Typography variant="h5" className={styles.sectionHeader}>
				Personal Info
			</Typography>
			<FormGroup>
				<TextField
					label="Display Name"
					variant="outlined"
					error={displayNameErrorStatus}
					helperText={displayNameHelper}
					required
					fullWidth
					value={displayName}
					onChange={(e) => {
						setDisplayName(e.target.value);
					}}
				/>
			</FormGroup>
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
				label="Middle Names"
				variant="outlined"
				fullWidth
				value={middleName}
				onChange={(e) => {
					setMiddleName(e.target.value);
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
			<div className={styles.fieldRow}>
				<Autocomplete
					options={Object.values(Gender)}
					value={gender}
					onChange={(e, value) => setGender(value)}
					renderInput={(params) => (
						<TextField
							variant="outlined"
							{...params}
							label="Gender"
							required
						/>
					)}
				/>
				{gender === Gender.OTHER ? (
					<TextField
						variant="outlined"
						value={genderOther}
						label="Gender (other)"
						onChange={(e) => setGenderOther(e.target.value)}
					/>
				) : null}
				<Autocomplete
					options={Object.values(Ethnicity)}
					value={ethnicity}
					onChange={(e, value) => setEthnicity(value)}
					renderInput={(params) => (
						<TextField
							variant="outlined"
							{...params}
							label="Ethnicity"
							required
						/>
					)}
				/>
				{ethnicity === Ethnicity.OTHER ? (
					<TextField
						variant="outlined"
						value={ethnicityOther}
						label="Ethnicity (other)"
						onChange={(e) => setEthnicityOther(e.target.value)}
					/>
				) : null}
			</div>
			<TextField
				label="Age"
				error={ageErrorStatus}
				helperText={ageHelper}
				variant="outlined"
				fullWidth
				value={age}
				onChange={(e) => {
					setAge(e.target.value);
				}}
			/>
			<div className={styles.fieldRow}>
				<TextField
					label="City"
					variant="outlined"
					fullWidth
					value={city}
					onChange={(e) => {
						setCity(e.target.value);
					}}
				/>
				<Autocomplete
					options={countries as string[]}
					value={country}
					onChange={(e, value) => {
						setCountry(value);
					}}
					renderInput={(params) => (
						<TextField
							variant="outlined"
							{...params}
							label="Country"
							required
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default BasicSection;
