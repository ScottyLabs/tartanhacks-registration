import { TextField, Typography } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { WorkPermission } from 'enums/Profile';
import React, {
	Dispatch,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { WorkAuthorizationFields } from 'types/ApplicationForm';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';

interface Sponsor {
	name: string;
	_id: string;
}

enum AuthorizationString {
	CITIZEN = 'I am a US citizen',
	SPONSORSHIP = 'I will need employer sponsorship at some point in the future',
	NO_SPONSORSHIP = 'I will NOT need employer sponsorship at some point in the future',
}

const statusToString = (status: WorkPermission): AuthorizationString => {
	switch (status) {
		case WorkPermission.CITIZEN:
			return AuthorizationString.CITIZEN;
		case WorkPermission.SPONSORSHIP:
			return AuthorizationString.SPONSORSHIP;
		case WorkPermission.NO_SPONSORSHIP:
			return AuthorizationString.NO_SPONSORSHIP;
	}
};

const stringToStatus = (status: AuthorizationString): WorkPermission => {
	switch (status) {
		case AuthorizationString.CITIZEN:
			return WorkPermission.CITIZEN;
		case AuthorizationString.SPONSORSHIP:
			return WorkPermission.SPONSORSHIP;
		case AuthorizationString.NO_SPONSORSHIP:
			return WorkPermission.NO_SPONSORSHIP;
	}
};

const WorkAuthorizationSection = ({
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
	const workAuthFields =
		useSelector((state: RootState) => state?.application?.workAuth) ?? {};

	// Work Authorization
	const sponsors: Sponsor[] =
		useSelector((state: RootState) => state.sponsors.data) || [];
	const sponsorMap: { [key: string]: Sponsor } = {};
	for (const sponsor of sponsors) {
		sponsorMap[sponsor._id] = sponsor;
	}

	const [workPermission, setWorkPermission] =
		useState<AuthorizationString | null>(null);
	const [workLocation, setWorkLocation] = useState<string>('');
	const [sponsorRanking, setSponsorRanking] = useState<Sponsor[]>([]);

	const validateForm = async () => {
		const sponsorRankingIds = sponsorRanking.map((sponsor) => sponsor._id);
		const data: WorkAuthorizationFields = {
			workPermission: stringToStatus(
				workPermission as AuthorizationString,
			),
			workLocation,
			sponsorRanking: sponsorRankingIds,
		};
		await dispatch(actions.application.saveWorkAuth(data));
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
			if (workAuthFields?.workPermission) {
				setWorkPermission(
					statusToString(workAuthFields?.workPermission),
				);
			} else {
				setWorkPermission(null);
			}
			setWorkLocation(workAuthFields?.workLocation ?? '');

			const sponsorRankingPopulated = workAuthFields?.sponsorRanking?.map(
				(sponsorId) => sponsorMap[sponsorId],
			);
			setSponsorRanking(sponsorRankingPopulated);
		}
		// eslint-disable-next-line
	}, [fetchedProfile]);

	useEffect(() => {
		dispatch(actions.sponsors.list());
		// eslint-disable-next-line
	}, []);

	return (
		<div className={styles.section}>
			<Typography variant="h5" className={styles.sectionHeader}>
				Sponsor Information
			</Typography>
			<Autocomplete
				options={Object.values(AuthorizationString)}
				value={workPermission}
				onChange={(e, value) => setWorkPermission(value)}
				renderInput={(params) => (
					<TextField
						variant="outlined"
						{...params}
						label="US Work Authorization"
					/>
				)}
			/>
			<TextField
				label="Work Location Preferences"
				variant="outlined"
				fullWidth
				value={workLocation}
				onChange={(e) => {
					setWorkLocation(e.target.value);
				}}
			/>
			{/* <Autocomplete
        multiple
        value={sponsorRanking}
        options={sponsors}
        getOptionLabel={(option: any) => option.name}
        onChange={(e, ranking: Sponsor[]) => setSponsorRanking(ranking)}
        getOptionDisabled={(options) => sponsorRanking.length >= 5}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            label="Rank Sponsors (Top 5)"
          />
        )}
      /> */}
		</div>
	);
};

export default WorkAuthorizationSection;
