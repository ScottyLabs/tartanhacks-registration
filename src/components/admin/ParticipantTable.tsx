import {
  Collapse,
  IconButton,
  LinearProgress,
  makeStyles,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip
} from "@material-ui/core"
import { Check, Close } from "@material-ui/icons"
import PersonIcon from "@material-ui/icons/Person"
import { ApplicationStatus } from "enums/ApplicationStatus"
import { ObjectId } from "mongoose"
import { ReactElement, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import getApplicationStatus from "src/util/getApplicationStatus"
import ProfileBox from "./ProfileBox"

const useStyles = makeStyles((theme) => ({
  content: {
    height: "80%",
    width: "100%",
    overflowY: "auto"
  },
  table: {
    height: "100%",
    paddingLeft: "1em",
    paddingRight: "1em"
  },
  statusLabel: {
    fontWeight: "bold"
  },
  actionRow: {
    display: "flex",
    flexDirection: "row"
  }
}))

const ParticipantTable = (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        setLoading(true)
        const { data } = await dispatch(actions.user.getParticipants())
        setParticipants(data)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    loadParticipants()
  }, [])

  return (
    <div className={classes.content}>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ProfileBox participant={selected} />
      </Modal>
      <Collapse in={loading}>
        <LinearProgress />
      </Collapse>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant: any) => {
            const status = getApplicationStatus(participant.status)
            return (
              <TableRow key={participant._id}>
                <TableCell>{participant.email}</TableCell>
                <TableCell className={classes.statusLabel}>{status}</TableCell>
                <TableCell>
                  <Tooltip title="View profile">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setSelected(participant)
                        setOpenModal(true)
                      }}
                    >
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <div className={classes.actionRow}>
                    {status == ApplicationStatus.APPLIED ? (
                      <>
                        <Tooltip title="Accept participant">
                          <IconButton style={{ color: "green" }}>
                            <Check />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Reject participant">
                          <IconButton style={{ color: "red" }}>
                            <Close />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ParticipantTable
