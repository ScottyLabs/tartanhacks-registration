import { Snackbar, TextField, Typography } from '@mui/material';
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import BackButton from 'src/components/design/BackButton';
import ContentHeader from 'src/components/design/ContentHeader';
import FloatingDiv from 'src/components/design/FloatingDiv';
import RectangleButton from 'src/components/design/RectangleButton';
import WaveFooter from 'src/components/design/WaveFooter';
import WaveHeader from 'src/components/design/WaveHeader';
import Menu from 'src/components/menu/Menu';
import { AuthenticatedLayout } from 'src/layouts';
import styles from 'styles/CreateTeam.module.scss';
import { RootState } from 'types/RootState';

const TeamCreate = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [teamName, setTeamName] = useState('');
	const [teamDescription, setTeamDescription] = useState('');
	const [addMembers, setAddMembers] = useState<any>([]);
	const [error, setError] = useState(false);
	const errorMessage = useSelector((state: RootState) => state?.teams?.error);

	return (
		<>
			<Menu />
			<div>
				<WaveHeader variant="light" />
				<WaveFooter />
				<FloatingDiv>
					<div>
						<BackButton
							link="/teams"
							className={styles.backButton}
						/>
					</div>
					<ContentHeader title="Create New Team" longTitle={true} />
					<div className={styles.content}>
						<Typography variant="h4" className={styles.title}>
							Basic Info
						</Typography>
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								try {
									await dispatch(
										actions.teams.createTeam(
											teamName,
											teamDescription,
										),
									);
									if (addMembers) {
										addMembers.forEach(
											async (elem: string) => {
												try {
													await dispatch(
														actions.teams.inviteByEmail(
															elem,
														),
													);
												} catch (err) {
													setError(true);
												}
											},
										);
									}
									router.push('/teams');
								} catch (err) {
									setError(true);
								}
							}}
						>
							<Typography
								variant="subtitle1"
								className={styles.annotation}
							>
								Team Name*
							</Typography>
							<TextField
								required
								variant="outlined"
								placeholder="Your team's name"
								fullWidth={true}
								value={teamName}
								className={styles.textField}
								InputProps={{
									className: styles.textFieldInput,
									classes: {
										notchedOutline: styles.textFieldInput,
									},
								}}
								onChange={(e) => {
									setTeamName(e.target.value);
								}}
							/>

							<Typography
								variant="subtitle1"
								className={styles.annotation}
							>
								Team Description*
							</Typography>
							<TextField
								required
								variant="outlined"
								placeholder="Your team's description"
								fullWidth={true}
								value={teamDescription}
								className={styles.textField}
								InputProps={{
									className: styles.textFieldInput,
									classes: {
										notchedOutline: styles.textFieldInput,
									},
								}}
								onChange={(e) => {
									setTeamDescription(e.target.value);
								}}
							/>

							<Typography
								variant="subtitle1"
								className={styles.annotation}
							>
								Invite New Member
							</Typography>
							<TextField
								variant="outlined"
								placeholder={
									'e.g. user@example.com\n        teammate@tartanhacks.cmu.edu'
								}
								fullWidth={true}
								className={styles.textField}
								multiline
								InputProps={{
									className: styles.textFieldInput,
									classes: {
										notchedOutline: styles.textFieldInput,
									},
								}}
								onChange={(e) => {
									setAddMembers(
										e.target.value
											.split('\n')
											.filter(
												(elem: string) => elem !== '',
											)
											.map((elem: string) => elem.trim()),
									);
								}}
							/>
							<RectangleButton
								type="submit"
								className={styles.createButton}
							>
								CREATE NEW TEAM
							</RectangleButton>
						</form>
					</div>
				</FloatingDiv>
			</div>
			<Snackbar
				open={error}
				autoHideDuration={5000}
				onClose={(e) => setError(false)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert severity="error">{errorMessage}</Alert>
			</Snackbar>
		</>
	);
};

export default AuthenticatedLayout(TeamCreate);
