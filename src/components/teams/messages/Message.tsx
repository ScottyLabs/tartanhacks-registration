import { makeStyles, Typography } from "@material-ui/core"
import { useRouter } from "next/dist/client/router"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "src/components/design/RectangleButton"

const useStyles = makeStyles((theme) => ({
  newCell: {
    paddingTop: "5px",
    width: "60px",
    verticalAlign: "top",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "40px"
    }
  },
  new: {
    color: theme.palette.primary.main,
    fontSize: "20px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    top: "0px",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "13px"
    }
  },
  message: {
    paddingRight: "15px",
    paddingLeft: "30px",
    paddingBottom: "30px",
    paddingTop: "10px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  tableEntryButton: {
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: "30px",
    fontWeight: 600,
    textAlign: "center",
    textTransform: "uppercase",
    borderRadius: "10px",
    background: theme.palette.gradient.end,
    color: "#FFFFFF",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "20px"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "13px",
      height: "56px",
      paddingLeft: "0px",
      paddingRight: "0px"
    }
  },
  buttonCell: {
    width: "20%",
    paddingLeft: "20px",
    paddingBottom: "30px",
    paddingTop: "10px",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "25%",
      paddingLeft: "5px"
    }
  },
  row: {
    borderBottom: "7px solid #F7C06260"
  },
  messageHeader: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    display: "block",
    marginLeft: "0",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    }
  },
  messageText: {
    paddingTop: "30px",
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "12px",
      paddingTop: "10px"
    }
  }
}))

const Message = (props: any) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const getMessage = (request: any) => {
    const header =
      request.type === "JOIN"
        ? "JOIN REQUEST"
        : request.type === "INVITE"
        ? "INVITATION"
        : request.type
    const body =
      (request.type === "JOIN"
        ? props.isCaptain
          ? "Sent by user"
          : "Sent to team"
        : request.type === "INVITE"
        ? props.isCaptain
          ? "For user"
          : "From team"
        : request.type) +
      " " +
      (props.isCaptain ? request.user.email : request.team.name)
    return {
      header: header,
      body: body
    }
  }

  const message = getMessage(props.content)
  const types = props.isCaptain
    ? {
        cancel: "INVITE",
        acceptDecline: "JOIN"
      }
    : {
        cancel: "JOIN",
        acceptDecline: "INVITE"
      }
  return (
    <tr className={classes.row}>
      <td className={classes.newCell}>
        {props.isNew && props.content.type != types.cancel ? (
          <Typography noWrap variant="subtitle1" className={classes.new}>
            New
          </Typography>
        ) : null}
      </td>
      <td className={classes.message}>
        <Typography variant="h4" className={classes.messageHeader}>
          {message.header}
        </Typography>
        <Typography variant="subtitle1" className={classes.messageText}>
          {message.body}
        </Typography>
      </td>
      <td className={classes.buttonCell}>
        {props.content.type == types.acceptDecline ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              try {
                await dispatch(
                  actions.requests.acceptRequest(props.content._id)
                )
                props.setNotify("success")
                props.setSuccessMessage(
                  props.isCaptain
                    ? "Successfully added the user"
                    : "Successfully joined the team!"
                )
              } catch (err) {
                props.setNotify("error")
              } finally {
                props.handleRemove(props.content._id)
              }
            }}
          >
            <RectangleButton type="submit" className={classes.tableEntryButton}>
              Accept
            </RectangleButton>
          </form>
        ) : null}
      </td>
      <td className={classes.buttonCell}>
        {props.content.type == types.acceptDecline ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              try {
                await dispatch(
                  actions.requests.declineRequest(props.content._id)
                )
              } catch (err) {
                props.setNotify("error")
              } finally {
                props.handleRemove(props.content._id)
              }
            }}
          >
            <RectangleButton type="submit" className={classes.tableEntryButton}>
              Decline
            </RectangleButton>
          </form>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              try {
                await dispatch(
                  actions.requests.cancelRequest(props.content._id)
                )
              } catch (err) {
                props.setNotify("error")
              } finally {
                props.handleRemove(props.content._id)
              }
            }}
          >
            <RectangleButton type="submit" className={classes.tableEntryButton}>
              Cancel
            </RectangleButton>
          </form>
        )}
      </td>
    </tr>
  )
}

export default Message
