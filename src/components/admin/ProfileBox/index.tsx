import {
	Box,
	CircularProgress,
	Collapse,
	Link,
	Table,
	TableBody,
	TableCell,
	TableRow,
	Typography,
} from '@mui/material';
import { Cancel, Check, OpenInNew } from '@mui/icons-material';
import { Ethnicity, Gender } from 'enums/Profile';
import { Status } from 'enums/Status';
import React, {
	SetStateAction,
	Dispatch,
	ReactElement,
	useEffect,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { Participant } from 'types/Participant';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';
import RectangleButton from '../../design/RectangleButton';

const ProfileContent = ({ profile }: { profile?: any }): ReactElement => {
	const sponsors = useSelector((store: RootState) => store?.sponsors?.data);
	const sponsorMap: Record<string, string> = {};
	for (const { _id, name } of sponsors) {
		sponsorMap[_id] = name;
	}

	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Basic Information</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Display Name</TableCell>
					<TableCell>{profile.displayName}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Full Name</TableCell>
					<TableCell>
						{profile.firstName} {profile.middleName}{' '}
						{profile.lastName}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Gender</TableCell>
					<TableCell>
						{profile.gender === Gender.OTHER
							? profile.genderOther
							: profile.gender}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Ethnicity</TableCell>
					<TableCell>
						{profile.ethnicity === Ethnicity.OTHER
							? profile.ethnicityOther
							: profile.ethnicity}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Age</TableCell>
					<TableCell>{profile.Age}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>City</TableCell>
					<TableCell>{profile.city}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Country</TableCell>
					<TableCell>{profile.country}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">School Info</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>School</TableCell>
					<TableCell>{profile.school}</TableCell>
				</TableRow>
				{profile.college === null ? null : (
					<TableRow>
						<TableCell>College</TableCell>
						<TableCell>{profile.college}</TableCell>
					</TableRow>
				)}
				<TableRow>
					<TableCell>Graduation Year</TableCell>
					<TableCell>{profile.graduationYear}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Major</TableCell>
					<TableCell>{profile.major}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Experience</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Years of Hackathon Experience</TableCell>
					<TableCell>{profile.hackathonExperience}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Work Authorization</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Work Permission</TableCell>
					<TableCell>{profile.workPermission}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Work Location</TableCell>
					<TableCell>{profile.workLocation}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Portfolio</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>GitHub</TableCell>
					<TableCell>{profile.github}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>LinkedIn</TableCell>
					<TableCell>{profile.linkedin}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Resume</TableCell>
					<TableCell>
						<Link href={profile.resume} target="_blank">
							<OpenInNew className={styles.icon} />
						</Link>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Design</TableCell>
					<TableCell>{profile.design}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Website</TableCell>
					<TableCell>{profile.website}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Travel</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Wants Travel Reimbursement?</TableCell>
					<TableCell>
						{profile.wantsTravelReimbursement ? (
							<Check className={styles.icon} />
						) : (
							<Cancel className={styles.icon} />
						)}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Travel Details</TableCell>
					<TableCell>{profile.travelDetails}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">
							Diversity Statement
						</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						Diversity Statement
					</TableCell>
					<TableCell>{profile.diversityStatement}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">
							Logistical Information
						</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Phone Number</TableCell>
					<TableCell>{profile.phoneNumber}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Dietary Restrictions</TableCell>
					<TableCell>
						{profile.dietaryRestrictions.join(', ')}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Shirt Size</TableCell>
					<TableCell>{profile.shirtSize}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Wants Hardware</TableCell>
					<TableCell>
						{profile.wantsHardware ? (
							<Check className={styles.icon} />
						) : (
							<Cancel className={styles.icon} />
						)}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Additional Notes</TableCell>
					<TableCell>{profile.notes}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						<Typography variant="h6">Other</Typography>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>MLH Email Subscription</TableCell>
					<TableCell>
						{profile.mlhEmailSubscription ? (
							<Check className={styles.icon} />
						) : (
							<Cancel className={styles.icon} />
						)}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
};

const AdminSettings = ({
	participant,
	dispatch,
	setProfileOpen,
}: {
	participant?: any;
	dispatch: Dispatch<any>;
	setProfileOpen: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
	if (participant?.admin) {
		return (
			<RectangleButton
				className={styles.buttonMargin}
				type="button"
				onClick={async () => {
					try {
						await dispatch(
							actions.user.removeAdmin(participant?._id),
						);
						if (participant) participant.admin = false;
						setProfileOpen(false);
					} catch (err) {
						console.error('Error removing user admin');
					}
				}}
			>
				Remove Admin
			</RectangleButton>
		);
	} else {
		return (
			<RectangleButton
				className={styles.buttonMargin}
				type="button"
				onClick={async () => {
					try {
						await dispatch(actions.user.addAdmin(participant?._id));
						if (participant) participant.admin = true;
						setProfileOpen(false);
					} catch (err) {
						console.error('Error making user admin');
					}
				}}
			>
				Make Admin
			</RectangleButton>
		);
	}
};

const JudgeSettings = ({
	participant,
	dispatch,
	setProfileOpen,
}: {
	participant?: any;
	dispatch: Dispatch<any>;
	setProfileOpen: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
	if (participant?.judge) {
		return (
			<RectangleButton
				className={styles.buttonMargin}
				type="button"
				onClick={async () => {
					try {
						await dispatch(
							actions.user.removeJudges([participant?.email]),
						);
						if (participant) participant.judge = false;
						setProfileOpen(false);
					} catch (err) {
						console.error('Error removing user judge');
					}
				}}
			>
				Remove Judge
			</RectangleButton>
		);
	} else {
		return (
			<RectangleButton
				className={styles.buttonMargin}
				type="button"
				onClick={async () => {
					try {
						await dispatch(actions.user.addJudges([participant?.email]));
						if (participant) participant.judge = true;
						setProfileOpen(false);
					} catch (err) {
						console.error('Error making user judge');
					}
				}}
			>
				Make Judge
			</RectangleButton>
		);
	}
};

const ProfileBox = React.forwardRef(
	(
		{
			participant,
			setProfileOpen,
		}: {
			participant: Participant;
			setProfileOpen: Dispatch<SetStateAction<boolean>>;
		},
		ref,
	): ReactElement => {
		const dispatch = useDispatch();
		const [profile, setProfile] = useState<any>(null);
		const [loading, setLoading] = useState(true);

		const status = participant?.status;

		const incomplete = [Status.UNVERIFIED, Status.VERIFIED];
		let profileContent = null;
		if (profile != null && !incomplete.includes(status)) {
			profileContent = <ProfileContent profile={profile} />;
		}

		useEffect(() => {
			const queryProfile = async () => {
				try {
					setLoading(true);
					const { data } = await dispatch(
						actions.user.getProfile(participant._id),
					);
					setProfile(data);
					setLoading(false);
				} catch (err) {
					console.error(err);
					setLoading(false);
				}
			};
			queryProfile();
		}, [participant]);

		return (
			<>
				<Box className={styles.modal}>
					<Collapse in={loading}>
						<CircularProgress />
					</Collapse>
					{loading ? null : (
						<>
							<Typography variant="h5">
								{participant?.email}
							</Typography>
							<Typography variant="h6">
								Status:{' '}
								<span className={styles.statusLabel}>
									{status}
								</span>
							</Typography>
							<AdminSettings
								participant={participant}
								dispatch={dispatch}
								setProfileOpen={setProfileOpen}
							/>
							<JudgeSettings
								participant={participant}
								dispatch={dispatch}
								setProfileOpen={setProfileOpen}
							/>
							{profileContent}
						</>
					)}
				</Box>
			</>
		);
	},
);

export default ProfileBox;
