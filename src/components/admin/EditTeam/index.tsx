import {
	Box,
	CircularProgress,
	Collapse,
	TextField,
	Button,
	Typography,
} from '@mui/material';
import { Cancel, Check, OpenInNew } from '@mui/icons-material';
import { Status } from 'enums/Status';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { Team } from 'types/Team';
import styles from './index.module.scss';

const EditTeam = ({ team }: { team: Team }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState(team.name);
	const [desc, setDesc] = useState(team.description);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			await dispatch(actions.teams.editTeamInfo(name, desc));
		} catch (err) {
			console.error('Error setting team info: ' + err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Box className={styles.modal} component="form" onSubmit={handleSubmit}>
			<Typography variant="h5">Team Information</Typography>
			<TextField
				label="Team Name"
				variant="outlined"
				fullWidth
				margin="normal"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<TextField
				label="Team Description"
				variant="outlined"
				fullWidth
				margin="normal"
				value={desc}
				onChange={(e) => setDesc(e.target.value)}
			/>

			<Button
				variant="outlined"
				id="save_button"
				type="submit"
				disabled={loading}
			>
				{loading ? (
					<Collapse in={loading}>
						<CircularProgress />
					</Collapse>
				) : (
					'Save'
				)}
			</Button>
		</Box>
	);
};
export default EditTeam;
