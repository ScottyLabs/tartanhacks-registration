import {
	Button,
	Chip,
	CircularProgress,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
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
import CloseIcon from '@mui/icons-material/Close';
import { Status } from 'enums/Status';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column, useTable } from 'react-table';
import actions from 'src/actions';
import { Participant } from 'types/Participant';
import RectangleButton from '../../design/RectangleButton';
import ProfileBox from '../ProfileBox';
import styles from './index.module.scss';
import {
	CheckOutlined,
	ClearOutlined,
	LockResetOutlined,
	MoreHorizRounded,
} from '@mui/icons-material';
import { RootState } from 'types/RootState';

enum BulkAction {
	ADMIT_ALL = 'Admit all',
	REJECT_ALL = 'Reject all',
}

interface Sponsor {
	name: string;
	_id: string;
}

const ParticipantTable = (): ReactElement => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [invalidated, setInvalidated] = useState(false);

	const [participants, setParticipants] = useState<Participant[]>([]);
	const [selected, setSelected] = useState<Participant | null>(null);

	const [profileOpen, setProfileOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [bulkAction, setBulkAction] = useState<BulkAction | null>(null);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [snackbarMsg, setSnackbarMsg] = useState('');
	const snackbarDuration = 3000;

	const [searchString, setSearchString] = useState('');

	const sponsors: Sponsor[] =
		useSelector((state: RootState) => state.sponsors.data) || [];

	const openSnackbar = (msg: string) => {
		setSnackbarMsg(msg);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarOpen(false);
	};

	const snackbarAction = (
		<div>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleSnackbarClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</div>
	);

	const getStatusChips = (status: Status) => {
		if (status == Status.UNVERIFIED) {
			return (
				<Chip
					label="UNVERIFIED"
					className={`${styles.chipMargin} ${styles.chipUnverified}`}
				/>
			);
		} else if (status == Status.VERIFIED) {
			return (
				<Chip
					label="VERIFIED"
					className={`${styles.chipMargin} ${styles.chipVerified}`}
				/>
			);
		} else if (status == Status.COMPLETED_PROFILE) {
			return (
				<Chip
					label="APPLIED"
					className={`${styles.chipMargin} ${styles.chipApplied}`}
				/>
			);
		} else if (status == Status.ADMITTED) {
			return (
				<Chip
					label="ADMITTED"
					className={`${styles.chipMargin} ${styles.chipAdmitted}`}
				/>
			);
		} else if (status == Status.REJECTED) {
			return (
				<Chip
					label="REJECTED"
					className={`${styles.chipMargin} ${styles.chipRejected}`}
				/>
			);
		} else if (status == Status.DECLINED) {
			return (
				<Chip
					label="DECLINED"
					className={`${styles.chipMargin} ${styles.chipDeclined}`}
				/>
			);
		} else if (status == Status.CONFIRMED) {
			return (
				<Chip
					label="CONFIRMED"
					className={`${styles.chipMargin} ${styles.chipConfirmed}`}
				/>
			);
		}
	};

	const getAdminChip = (admin: boolean) => {
		if (admin) {
			return (
				<Chip
					label="ADMIN"
					className={`${styles.chipMargin} ${styles.chipAdmin}`}
				/>
			);
		}
	};

	const getJudgeChip = (judge: boolean) => {
		if (judge) {
			return (
				<Chip
					label="JUDGE"
					className={`${styles.chipMargin} ${styles.chipJudge}`}
				/>
			);
		}
	};

	const getCompanyChip = (company?: string) => {
		if (company && sponsors) {
			const sponsorName = sponsors.find(
				(sponsor) => sponsor._id == company,
			)?.name;
			return (
				<Chip
					label={sponsorName}
					className={`${styles.chipMargin}`}
				/>
			);
		}
	}

	const admitUser = async (userId: string) => {
		try {
			await dispatch(actions.user.admitUser(userId));
			openSnackbar('Admitted user!');
			setInvalidated(true);
		} catch (err) {
			openSnackbar('Error admitting user');
		}
	};

	const rejectUser = async (userId: string) => {
		try {
			await dispatch(actions.user.rejectUser(userId));
			openSnackbar('Rejected user!');
			setInvalidated(true);
		} catch (err) {
			openSnackbar('Error admitting user');
		}
	};

	const requestReset = async (email: string) => {
		try {
			await dispatch(actions.auth.requestReset(email));
			openSnackbar('Sent reset password email!');
		} catch (err) {
			openSnackbar('Error sending reset password email');
		}
	};

	const admitAll = async () => {
		try {
			await dispatch(actions.user.admitAll());
			openSnackbar('Admitted all remaining users!');
			setInvalidated(true);
		} catch (err) {
			openSnackbar('Error admitting all users');
		}
	};

	const rejectAll = async () => {
		try {
			await dispatch(actions.user.rejectAll());
			openSnackbar('Rejected all remaining users!');
			setInvalidated(true);
		} catch (err) {
			openSnackbar('Error rejecting all users');
		}
	};

	useEffect(() => {
		const getParticipants = async () => {
			setLoading(true);
			try {
				await dispatch(actions.sponsors.list());

				const { data } = (await dispatch(
					actions.user.getParticipants(),
				)) as {
					data: Participant[];
				};
				data.sort((a, b) => {
					const statusComp = a.status.localeCompare(b.status);
					if (statusComp !== 0) {
						return statusComp;
					}
					return a.email.localeCompare(b.email);
				});
				setParticipants(data);
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
			setInvalidated(false);
		};
		getParticipants();
	}, [invalidated]);

	const columns: Column<Participant>[] = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: '_id',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }: { cell: any }) => {
					const original: Participant = cell.row.original;
					return (
						<div>
							{getStatusChips(original.status)}
							{getAdminChip(original.admin)}
							{getJudgeChip(original.judge)}
							{getCompanyChip(original.company)}
						</div>
					);
				},
			},
			{
				Header: 'Profile',
				Cell: ({ cell }: { cell: any }) => {
					const original: Participant = cell.row.original;
					return (
						<RectangleButton
							className={styles.buttonMargin}
							type="button"
							onClick={() => {
								setSelected(original);
								setProfileOpen(true);
							}}
						>
							Profile
						</RectangleButton>
					);
				},
			},
			{
				Header: 'Actions',
				Cell: ({ cell }: { cell: any }) => {
					const original: Participant = cell.row.original;
					const { _id, status } = original;

					const [anchorEl, setAnchorEl] =
						React.useState<null | HTMLElement>(null);
					const open = Boolean(anchorEl);
					const handleClick = (
						event: React.MouseEvent<HTMLButtonElement>,
					) => {
						setAnchorEl(event.currentTarget);
					};
					const handleClose = () => {
						setAnchorEl(null);
					};

					return (
						<div>
							<IconButton
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								<MoreHorizRounded />
							</IconButton>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									'aria-labelledby': 'basic-button',
								}}
							>
								{status === Status.COMPLETED_PROFILE && (
									<>
										<MenuItem
											onClick={async () => {
												await admitUser(_id);
												handleClose();
											}}
										>
											<ListItemIcon>
												<CheckOutlined fontSize="small" />
											</ListItemIcon>
											<ListItemText>Accept</ListItemText>
										</MenuItem>
										<MenuItem
											onClick={async () => {
												await rejectUser(_id);
												handleClose();
											}}
										>
											<ListItemIcon>
												<ClearOutlined fontSize="small" />
											</ListItemIcon>
											<ListItemText>Reject</ListItemText>
										</MenuItem>
									</>
								)}
								<Divider />
								<MenuItem
									onClick={async () => {
										await requestReset(original.email);
										handleClose();
									}}
								>
									<ListItemIcon>
										<LockResetOutlined fontSize="small" />
									</ListItemIcon>
									<ListItemText>Reset Password</ListItemText>
								</MenuItem>
							</Menu>
						</div>
					);
				},
			},
		],
		[],
	);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable<Participant>({
			columns,
			data: participants,
			initialState: {
				hiddenColumns: ['_id'],
			},
		});

	const getRows = () => {
		return rows
			.filter(
				(row) =>
					// Search by email
					row.original.email
						.trim()
						.toLowerCase()
						.includes(
							searchString
								.trim()
								.toLowerCase(),
						) ||
					// Search by status
					row.original.status
						.trim()
						.toLowerCase()
						.includes(
							searchString
								.trim()
								.toLowerCase(),
						) ||
					// Search for applied status
					(row.original.status.includes(
							'COMPLETED_PROFILE',
						) &&
						searchString
							.trim()
							.toLowerCase() ==
						'applied') ||
					// Search for admins
					(row.original.admin &&
						searchString
							.trim()
							.toLowerCase() == 'admin') ||
					(row.original.judge &&
						searchString
							.trim()
							.toLowerCase() == 'judge') ||
					(row.original.company &&
						searchString
							.trim()
							.toLowerCase() == 'sponsor'),
			);
	};

	return (
		<>
			<Modal
				open={profileOpen}
				onClose={() => setProfileOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ProfileBox
					participant={selected as Participant}
					setProfileOpen={setProfileOpen}
				/>
			</Modal>
			<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<DialogTitle>{bulkAction}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to {bulkAction?.toLowerCase()}{' '}
						remaining applicants?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)}>Cancel</Button>
					<Button
						onClick={() => {
							if (bulkAction === BulkAction.ADMIT_ALL) {
								admitAll();
							} else if (bulkAction == BulkAction.REJECT_ALL) {
								rejectAll();
							}
							setDialogOpen(false);
						}}
					>
						{bulkAction}
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={snackbarDuration}
				onClose={handleSnackbarClose}
				message={snackbarMsg}
				action={snackbarAction}
			/>
			<div className={styles.dialogContent}>
				<Collapse in={loading}>
					<div className={styles.spinnerContainer}>
						<CircularProgress />
					</div>
				</Collapse>
				<Toolbar className={styles.toolbar}>
					<div className={styles.toolbarContent}>
						<RectangleButton
							type="button"
							onClick={() => {
								setBulkAction(BulkAction.ADMIT_ALL);
								setDialogOpen(true);
							}}
							disabled
						>
							Admit All
						</RectangleButton>
						<RectangleButton
							type="button"
							onClick={() => {
								setBulkAction(BulkAction.REJECT_ALL);
								setDialogOpen(true);
							}}
						>
							Reject All
						</RectangleButton>
					</div>
				</Toolbar>
				<TableContainer>
					<TextField
						variant="outlined"
						placeholder="Search by email or status"
						fullWidth={true}
						value={searchString}
						InputProps={{
							classes: { notchedOutline: styles.textFieldInput },
						}}
						onChange={(e) => {
							setSearchString(e.target.value);
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
								getRows().slice(
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
					rowsPerPageOptions={[5, 10, 25, 50]}
					component="div"
					count={getRows().length}
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

export default ParticipantTable;
