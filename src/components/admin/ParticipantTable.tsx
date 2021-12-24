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
  IconButton,
  makeStyles,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Tooltip,
  Typography,
  useTheme
} from "@material-ui/core"
import { Person } from "@material-ui/icons"
import CloseIcon from "@material-ui/icons/Close"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { ReactElement, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { Column, useTable } from "react-table"
import actions from "src/actions"
import getApplicationStatus from "src/util/getApplicationStatus"
import { Participant } from "types/Participant"
import RectangleButton from "../design/RectangleButton"
import ProfileBox from "./ProfileBox"

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
  toolbar: {
    width: "100%",
    justifyContent: "end"
  },
  toolbarContent: {
    paddingRight: "1em",
    display: "flex",
    flexDirection: "row",
    gap: "1em"
  },
  table: {
    width: "100%"
  },
  chipMargin: {
    marginRight: "0.5em"
  },
  chipUnverified: { backgroundColor: theme.palette.unverified },
  chipVerified: { backgroundColor: theme.palette.verified },
  chipApplied: { backgroundColor: theme.palette.applied },
  chipAdmitted: { backgroundColor: theme.palette.admitted },
  chipRejected: { backgroundColor: theme.palette.rejected },
  chipDeclined: { backgroundColor: theme.palette.declined },
  chipConfirmed: { backgroundColor: theme.palette.confirmed }
}))

enum BulkAction {
  ADMIT_ALL = "Admit all",
  REJECT_ALL = "Reject all"
}

const ParticipantTable = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [loading, setLoading] = useState(true)
  const [invalidated, setInvalidated] = useState(false)

  const [participants, setParticipants] = useState<Participant[]>([])
  const [selected, setSelected] = useState<Participant | null>(null)

  const [profileOpen, setProfileOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState<BulkAction>(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [snackbarMsg, setSnackbarMsg] = useState("")
  const snackbarDuration = 3000

  const openSnackbar = (msg: string) => {
    setSnackbarMsg(msg)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbarOpen(false)
  }

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
  )

  const getStatusChips = (status: ApplicationStatus) => {
    if (status == ApplicationStatus.UNVERIFIED) {
      return (
        <Chip
          label="UNVERIFIED"
          className={`${classes.chipMargin} ${classes.chipUnverified}`}
        />
      )
    } else if (status == ApplicationStatus.VERIFIED) {
      return (
        <Chip
          label="VERIFIED"
          className={`${classes.chipMargin} ${classes.chipVerified}`}
        />
      )
    } else if (status == ApplicationStatus.APPLIED) {
      return (
        <Chip
          label="APPLIED"
          className={`${classes.chipMargin} ${classes.chipApplied}`}
        />
      )
    } else if (status == ApplicationStatus.ADMITTED) {
      return (
        <Chip
          label="ADMITTED"
          className={`${classes.chipMargin} ${classes.chipAdmitted}`}
        />
      )
    } else if (status == ApplicationStatus.REJECTED) {
      return (
        <Chip
          label="REJECTED"
          className={`${classes.chipMargin} ${classes.chipRejected}`}
        />
      )
    } else if (status == ApplicationStatus.DECLINED) {
      return (
        <Chip
          label="DECLINED"
          className={`${classes.chipMargin} ${classes.chipDeclined}`}
        />
      )
    } else if (status == ApplicationStatus.CONFIRMED) {
      return (
        <Chip
          label="CONFIRMED"
          className={`${classes.chipMargin} ${classes.chipConfirmed}`}
        />
      )
    }
  }

  const admitUser = async (userId: string) => {
    try {
      await dispatch(actions.user.admitUser(userId))
      openSnackbar("Admitted user!")
      setInvalidated(true)
    } catch (err) {
      openSnackbar("Error admitting user")
    }
  }

  const rejectUser = async (userId: string) => {
    try {
      await dispatch(actions.user.rejectUser(userId))
      openSnackbar("Rejected user!")
      setInvalidated(true)
    } catch (err) {
      openSnackbar("Error admitting user")
    }
  }

  const admitAll = async () => {
    try {
      await dispatch(actions.user.admitAll())
      openSnackbar("Admitted all remaining users!")
      setInvalidated(true)
    } catch (err) {
      openSnackbar("Error admitting all users")
    }
  }

  const rejectAll = async () => {
    try {
      await dispatch(actions.user.rejectAll())
      openSnackbar("Rejected all remaining users!")
      setInvalidated(true)
    } catch (err) {
      openSnackbar("Error rejecting all users")
    }
  }

  useEffect(() => {
    const getParticipants = async () => {
      setLoading(true)
      try {
        const { data } = await dispatch(actions.user.getParticipants())
        setParticipants(data)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
      setInvalidated(false)
    }
    getParticipants()
  }, [invalidated])

  const columns: Column<Participant>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell }: { cell: any }) => {
          const original: Participant = cell.row.original
          const { status } = original

          const applicationStatus = getApplicationStatus(status)
          return getStatusChips(applicationStatus)
        }
      },
      {
        Header: "Profile",
        Cell: ({ cell }: { cell: any }) => {
          const original: Participant = cell.row.original
          return (
            <Tooltip title="View profile">
              <IconButton
                color="primary"
                onClick={() => {
                  setSelected(original)
                  setProfileOpen(true)
                }}
              >
                <Person />
              </IconButton>
            </Tooltip>
          )
        }
      },
      {
        Header: "Actions",
        Cell: ({ cell }: { cell: any }) => {
          const original: Participant = cell.row.original
          const { _id, status } = original

          const applicationStatus = getApplicationStatus(status)
          if (applicationStatus == ApplicationStatus.APPLIED) {
            return (
              <div>
                <RectangleButton
                  className={classes.buttonMargin}
                  type="button"
                  onClick={() => admitUser(_id)}
                >
                  Admit
                </RectangleButton>
                <RectangleButton type="button" onClick={() => rejectUser(_id)}>
                  Reject
                </RectangleButton>
              </div>
            )
          } else {
            return <></>
          }
        }
      }
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Participant>({
      columns,
      data: participants,
      initialState: {
        hiddenColumns: ["_id"]
      }
    })

  return (
    <div>
      <Modal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProfileBox participant={selected as Participant}></ProfileBox>
      </Modal>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{bulkAction}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {bulkAction?.toLowerCase()} remaining
            applicants?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (bulkAction === BulkAction.ADMIT_ALL) {
                admitAll()
              } else if (bulkAction == BulkAction.REJECT_ALL) {
                rejectAll()
              }
              setDialogOpen(false)
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
      <div className={classes.dialogContent}>
        <Collapse in={loading}>
          <div className={classes.spinnerContainer}>
            <CircularProgress />
          </div>
        </Collapse>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarContent}>
            <RectangleButton
              type="button"
              onClick={() => {
                setBulkAction(BulkAction.ADMIT_ALL)
                setDialogOpen(true)
              }}
            >
              Admit All
            </RectangleButton>
            <RectangleButton
              type="button"
              onClick={() => {
                setBulkAction(BulkAction.REJECT_ALL)
                setDialogOpen(true)
              }}
            >
              Reject All
            </RectangleButton>
          </div>
        </Toolbar>
        <TableContainer>
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
                      headerGroup.headers.map((column, cellIdx) => (
                        // Apply the header cell props
                        <TableCell {...column.getHeaderProps()} key={cellIdx}>
                          {
                            // Render the header
                            column.render("Header")
                          }
                        </TableCell>
                      ))
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIdx) => {
                    // Prepare the row for display
                    prepareRow(row)
                    return (
                      // Apply the row props
                      <TableRow {...row.getRowProps()} key={rowIdx}>
                        {
                          // Loop over the rows cells
                          row.cells.map((cell, cellIdx) => {
                            // Apply the cell props
                            return (
                              <TableCell {...cell.getCellProps()} key={cellIdx}>
                                {
                                  // Render the cell contents
                                  cell.render("Cell")
                                }
                              </TableCell>
                            )
                          })
                        }
                      </TableRow>
                    )
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
          onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRowsPerPage(parseInt(event.target.value, 10))
            setPage(0)
          }}
        />
      </div>
    </div>
  )
}

export default ParticipantTable
