import {
	Typography,
	Button,
	Chip,
	CircularProgress,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Modal,
	Snackbar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Toolbar,
} from '@mui/material';
import { Alert, Autocomplete } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/actions';
import { RootState } from 'types/RootState';
import styles from './index.module.scss';
import axios from 'axios';
import { Team } from 'types/Team';
import { Column, useTable, Cell } from 'react-table';
import { Participant } from 'types/Participant';
import ProfileBox from '../ProfileBox';
import RectangleButton from 'src/components/design/RectangleButton';
import admin from 'pages/admin';
import EditTeam from '../EditTeam';
export default () => {
	const dispatch = useDispatch();

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [teams, setTeams] = useState<Team[]>([]);

	const [selectedUser, setSelectedUser] = useState<Participant | null>(null);

	const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [teamOpen, setTeamOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const [search, setSearch] = useState('');

	const user = useSelector((state: RootState) => state.accounts.data);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = (await dispatch(actions.user.getTeams())) as {
					data: Team[];
				};
				setTeams(data);
				console.log(teams);
			} catch (err) {
				setError(true);
				setErrorMessage(err as string);
			}
		};
		fetchData();
	}, []);

	const columns: Column<Team>[] = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Description',
				accessor: 'description',
			},
			{
				Header: 'Leader',
				accessor: 'admin',
				Cell: ({ cell }: { cell: any }) => {
					const original: Team = cell.row.original;
					const adminAsParticipant = original.members.find(
						(m) => m._id == original.admin._id,
					);
					if (!adminAsParticipant) {
						setErrorMessage('Error: Admin is not in team');
						setError(true);
						return;
					}

					const adminParticipant = original.members.find(
						(m) => m._id === adminAsParticipant._id,
					);

					if (!adminParticipant) {
						setErrorMessage('Error: Admin participant not found');
						setError(true);
						return;
					}

					return (
						<RectangleButton
							className={styles.buttonMargin}
							type="button"
							onClick={() => {
								setSelectedUser(adminParticipant);
								setProfileOpen(true);
							}}
						>
							Profile
						</RectangleButton>
					);
				},
			},
			{
				Header: 'Members',
				accessor: 'members',
				Cell: ({ cell }: { cell: any }) => {
					const members: Participant[] = cell.row.original.members;
					return members.map((member) => (
						<RectangleButton
							key={member._id}
							className={styles.buttonMargin}
							type="button"
							onClick={() => {
								setSelectedUser(member);
								setProfileOpen(true);
							}}
						>
							{member.email}
						</RectangleButton>
					));
				},
				getProps: () => {
					return {
						class: "team-cell"
					}
				}
			},
			{
				Header: 'Actions',
				Cell: (cell: Cell<Team>) => (
					<RectangleButton
						onClick={() => {
							setTeamOpen(true);
							setSelectedTeam(cell.row.original);
						}}
						type="button"
					>
						Edit
					</RectangleButton>
				),
			},
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable<Team>({
			columns,
			data: teams,
			initialState: {
				hiddenColumns: ['_id'],
			},
		});

	return (
		<>
			<Modal
				open={profileOpen || teamOpen}
				onClose={() => {
					setProfileOpen(false);
					setTeamOpen(false);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{profileOpen ? (
					<ProfileBox
						participant={selectedUser as Participant}
						setProfileOpen={setProfileOpen}
					/>
				) : teamOpen && selectedTeam ? (
					<EditTeam team={selectedTeam} />
				) : (
					<div></div>
				)}
			</Modal>
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
					}}
				>
					<div className={styles.formContents}>
						<div className={styles.buttonContainer}></div>
					</div>
				</form>
				<TableContainer>
					<TextField
						variant="outlined"
						placeholder="Search by team name..."
						fullWidth={true}
						value={search}
						InputProps={{
							classes: { notchedOutline: styles.textFieldInput },
						}}
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(0);
						}}
					/>
					<Table {...getTableProps()}>
						<TableHead>
							{
								// Loop over the header rows
								headerGroups.map((headerGroup, headerIdx) => (
									// Apply the header row props
									<TableRow
										{...headerGroup.getHeaderGroupProps()}
										key={headerIdx}
									>
										{
											// Loop over the headers in each row
											headerGroup.headers.map(
												(column, cellIdx) => (
													// Apply the header cell props
													<TableCell
														{...column.getHeaderProps()}
														key={cellIdx}
													>
														{
															// Render the header
															column.render(
																'Header',
															)
														}
													</TableCell>
												),
											)
										}
									</TableRow>
								))
							}
						</TableHead>
						{/* Apply the table body props */}
						<TableBody {...getTableBodyProps()}>
							{
								// Loop over the table rows
								rows
									.filter((row) => {
										const query = search.toLowerCase()
										const obj = row.original;
										return obj.name.toLowerCase().includes(query) ||
											obj.description.toLowerCase().includes(query) ||
											obj.members.some((member) => (member.firstName + member.lastName)
												.toLowerCase().includes(query))
									})
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage,
									)
									.map((row, rowIdx) => {
										// Prepare the row for display
										prepareRow(row);
										return (
											// Apply the row props
											<TableRow
												{...row.getRowProps()}
												key={rowIdx}
											>
												{
													// Loop over the rows cells
													row.cells.map(
														(cell, cellIdx) => {
															// Apply the cell props
															return (
																<TableCell
																	{...cell.getCellProps()}
																	key={
																		cellIdx
																	}
																>
																	{
																		// Render the cell contents
																		cell.render(
																			'Cell',
																		)
																	}
																</TableCell>
															);
														},
													)
												}
											</TableRow>
										);
									})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={(e, newPage: number) => setPage(newPage)}
					onRowsPerPageChange={(
						event: React.ChangeEvent<HTMLInputElement>,
					) => {
						setRowsPerPage(parseInt(event.target.value, 10));
						setPage(0);
					}}
				/>
			</div>
		</>
	);
};
