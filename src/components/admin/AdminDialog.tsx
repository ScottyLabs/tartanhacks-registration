import {
    Collapse,
    CircularProgress,
    Link,
    makeStyles,
    Typography,
    Button,
    Modal,
    Paper,
    Chip,
    Snackbar,
    IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import {
    ReactElement,
    useState,
    useEffect,
    useMemo
} from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useTable, Column, Cell } from "react-table"
import ProfileBox from "./ProfileBox"
import RectangleButton from "../design/RectangleButton"
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    dialog: {
        display: "flex",
        alignItems: "center",
        width: "75%",
        borderRadius: "25px",
        padding: "2em",
        margin: "0 auto",
        flexDirection: "column",
        backgroundImage: `linear-gradient(316.54deg, rgba(255, 227, 227, 0.7565) 
                        35.13%, rgba(255, 255, 255, 0.85) 126.39%)`,
        boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
        backdropFilter: "blur(4px)",
        [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
            width: "80%"
        },
        [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
            width: "70%"
        },
        maxHeight: "70%",
        overflow: "scroll"
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    spinnerContainer: {
        display: "flex",
        justifyContent: "center"
    },
    buttonMargin: {
        marginRight: "1em"
    },
    table: {
        width: "100%"
    },
    chipMargin: {
        marginRight: "0.5em"
    }
}))

interface DataInit {
    admin: boolean;
    company: string;
    _id: string;
    email: string;
}
interface Data {
    id: string;
    email: string;
    status: string;
    admitted: boolean;
    confirmed: boolean;
    completedProfile: boolean;
    profile: string;
}

const AdminDialog = (): ReactElement => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const classes = useStyles(theme)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<Data[]>([])

    const [profileOpen, setProfileOpen] = useState(false);
    const handleProfileOpen = () => setProfileOpen(true);
    const handleProfileClose = () => setProfileOpen(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [profile, setProfile] = useState({});

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [snackbarMsg, setSnackbarMsg] = useState("");
    const snackbarDuration = 3000;

    const openSnackbar = (msg: string) => {
        setSnackbarMsg(msg)
        setSnackbarOpen(true);
    }

    const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUserInfo = async (user: DataInit) => {
        const id = user._id
        const res = await dispatch(actions.user.getStatus(id))
        const status = res.data
        const admitText = status.admitted ? "A" : "NA"
        const confText = status.confirmed ? "C" : "NC"
        const profText = status.completedProfile ? "CP" : "NCP"

        return {
            id,
            email: user.email,
            status: [admitText, confText, profText].join(" / "),
            admitted: status.admitted,
            confirmed: status.confirmed,
            completedProfile: status.completedProfile,
        }
    }

    const getStatusChips = (cell: Cell<Data, string>) => {
        const admitted = cell.row.allCells[1].value
        const confirmed = cell.row.allCells[2].value
        const completedProfile = cell.row.allCells[3].value

        return (
            <div>
                <Chip label="A" className={classes.chipMargin} color={admitted ? "primary" : "default"} />
                <Chip label="C" className={classes.chipMargin} color={confirmed ? "primary" : "default"} />
                <Chip label="CP" color={completedProfile ? "primary" : "default"} />
            </div>
        )
    }

    const getUserIdFromCell = (cell: Cell<Data, string>) => {
        return cell.row.allCells[0].value
    }

    const handleProfileClick = async (cell: Cell<Data, string>) => {
        const userId = getUserIdFromCell(cell)
        try {
            const res = await dispatch(actions.user.getProfile(userId))
            setProfile(res.data)
            handleProfileOpen()
        } catch (err) {
            console.log(err)
            openSnackbar("User has no profile")
        }
    }

    const handleAdmitClick = async (cell: Cell<Data, string>) => {
        const userId = getUserIdFromCell(cell)
        try {
            await dispatch(actions.user.admitUser(userId))
            openSnackbar("Admitted user")
        } catch (err) {
            openSnackbar("Error admitting user")
            console.log(err)
        }
    }

    const handleRejectClick = async (cell: Cell<Data, string>) => {
        const userId = getUserIdFromCell(cell)
        try {
            await dispatch(actions.user.rejectUser(userId))
            openSnackbar("Rejected user")
        } catch (err) {
            openSnackbar("Error rejecting user")
            console.log(err)
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const res = await dispatch(actions.user.getUsers())
                const dataTransformed: Data[] = await Promise.all(res.data.map(async (user: DataInit) => {
                    try {
                        const transformed = await getUserInfo(user);
                        return transformed;
                    } catch (err) {
                        console.log(err);
                    }
                }));
                setUsers([...dataTransformed]);
            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        if (loading) getUsers()
    }, [])

    const columns: Column<Data>[] = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Admitted',
                accessor: 'admitted',
            },
            {
                Header: 'Confirmed',
                accessor: 'confirmed',
            },
            {
                Header: 'Completed Profile',
                accessor: 'completedProfile',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ cell }) => (getStatusChips(cell))
            },
            {
                Header: "Actions",
                accessor: "profile",
                Cell: ({ cell }) => (
                    <div>
                        <RectangleButton className={classes.buttonMargin} type="button" onClick={() => handleProfileClick(cell)}>
                            Profile
                        </RectangleButton>
                        <RectangleButton className={classes.buttonMargin} type="button" onClick={() => handleAdmitClick(cell)}>
                            Admit
                        </RectangleButton>
                        <RectangleButton type="button" onClick={() => handleRejectClick(cell)}>
                            Reject
                        </RectangleButton>
                    </div>
                )
            },
        ],
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable<Data>({
        columns,
        data: users,
        initialState: {
            hiddenColumns: ['id', 'admitted', 'confirmed', 'completedProfile']
        }
    });

    return (
        <div className={classes.dialog}>
            <Collapse in={loading}>
                <div className={classes.spinnerContainer}>
                    <CircularProgress />
                </div>
            </Collapse>
            <Modal
                open={profileOpen}
                onClose={handleProfileClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProfileBox profile={profile}></ProfileBox>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={snackbarDuration}
                onClose={handleSnackbarClose}
                message={snackbarMsg}
                action={snackbarAction}
            />
            <div className={classes.dialogContent}>
                <Paper className={classes.table}>
                    <TableContainer >
                        <Table {...getTableProps()} >
                            <TableHead>
                                {// Loop over the header rows
                                    headerGroups.map(headerGroup => (
                                        // Apply the header row props
                                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                                            {// Loop over the headers in each row
                                                headerGroup.headers.map(column => (
                                                    // Apply the header cell props
                                                    <TableCell {...column.getHeaderProps()}>
                                                        {// Render the header
                                                            column.render('Header')}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))}
                            </TableHead>
                            {/* Apply the table body props */}
                            <TableBody {...getTableBodyProps()}>
                                {// Loop over the table rows
                                    rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                        // Prepare the row for display
                                        prepareRow(row)
                                        return (
                                            // Apply the row props
                                            <TableRow {...row.getRowProps()}>
                                                {// Loop over the rows cells
                                                    row.cells.map(cell => {
                                                        // Apply the cell props
                                                        return (
                                                            <TableCell {...cell.getCellProps()}>
                                                                {// Render the cell contents
                                                                    cell.render('Cell')}
                                                            </TableCell>
                                                        )
                                                    })}
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    )
}

export default AdminDialog
