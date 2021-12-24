import {
  Collapse,
  CircularProgress,
  Link,
  makeStyles,
  Typography,
  Button,
  Modal
} from "@material-ui/core"
import { useTheme } from "@material-ui/styles"
import { ReactElement, useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import actions from "src/actions"
import { useTable, Column, Cell } from "react-table"
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
    background: `linear-gradient(316.54deg, ${theme.palette.lightGradient.start} 35.13%, ${theme.palette.lightGradient.end} 126.39%)`,
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
    alignItems: "center"
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center"
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse"
  }
}))

const AdminDialog = (): ReactElement => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles(theme)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<Data[]>([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [profile, setProfile] = useState({})

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
      completedProfile: status.completedProfile
    }
  }

  const getUserIdFromCell = (cell: Cell<Data, string>) => {
    return cell.row.allCells[0].value
  }

  const handleProfileClick = async (cell: Cell<Data, string>) => {
    const userId = getUserIdFromCell(cell)
    console.log(userId)
    try {
      const res = await dispatch(actions.user.getProfile(userId))
      // console.log(res)
      setProfile(res.data)
      handleOpen()
    } catch (err) {
      console.log("User has no profile.")
      setProfile({})
      handleOpen()
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true)
      try {
        const res = await dispatch(actions.user.getUsers())
        const dataTransformed: Data[] = await Promise.all(
          res.data.map(async (user: DataInit) => {
            try {
              const transformed = await getUserInfo(user)
              return transformed
            } catch (err) {
              console.log(err)
            }
          })
        )
        console.log(dataTransformed)
        setUsers(dataTransformed)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    getUsers()
  }, [])

  interface DataInit {
    admin: boolean
    company: string
    _id: string
    email: string
  }
  interface Data {
    id: string
    email: string
    status: string
    admitted: boolean
    confirmed: boolean
    completedProfile: boolean
    profile: string
  }
  const columns: Column<Data>[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Profile",
        accessor: "profile",
        Cell: ({ cell }) => (
          <Button
            value={cell.row.values.name}
            onClick={() => handleProfileClick(cell)}
          >
            Profile
          </Button>
        )
      }
    ],
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>({
      columns,
      data: users,
      initialState: {
        hiddenColumns: ["id"]
      }
    })

  return (
    <div className={classes.dialog}>
      <Collapse in={loading}>
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      </Collapse>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProfileBox profile={profile}></ProfileBox>
      </Modal>
      <div className={classes.dialogContent}>
        <table {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render("Cell")
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDialog
