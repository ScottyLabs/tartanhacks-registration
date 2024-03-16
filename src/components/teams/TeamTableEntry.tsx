import { Hidden, Typography } from '@mui/material';
import actions from 'src/actions';
import RectangleButton from 'src/components/design/RectangleButton';
import { useRouter } from 'next/dist/client/router';
import { useDispatch } from 'react-redux';
import styles from './TeamTableEntry.module.scss';

const TeamTableEntry = (props: any) => {
	const router = useRouter();
	const dispatch = useDispatch();
	return (
		<>
			<tr>
				<td className={styles.teamNameCell}>
					<div>
						<Typography noWrap variant="h4" className={styles.name}>
							{props.team.name}
						</Typography>
						<Hidden xsDown>
							<Typography
								noWrap
								variant="subtitle1"
								className={styles.description}
							>
								{props.team.description}
							</Typography>
						</Hidden>
					</div>
				</td>
				<td className={styles.joinButton}>
					<form
						onSubmit={async (e) => {
							e.preventDefault();
							try {
								await dispatch(
									actions.teams.joinTeamRequest(
										props.team._id,
									),
								);
								props.callback(false);
							} catch (err) {
								props.callback(true);
							}
						}}
					>
						<RectangleButton
							type="submit"
							className={styles.tableEntryButton}
						>
							Join
						</RectangleButton>
					</form>
				</td>
				<td className={styles.viewDetailCell}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							router.push('/teams/details/' + props.team._id);
						}}
					>
						<RectangleButton
							type="submit"
							className={styles.tableEntryButton}
						>
							Details
						</RectangleButton>
					</form>
				</td>
			</tr>
		</>
	);
};

export default TeamTableEntry;
