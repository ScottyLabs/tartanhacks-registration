import { Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import actions from "src/actions"
import RectangleButton from "src/components/design/RectangleButton"
import styles from "./Message.module.scss"
import clsx from "clsx"

const Message = (props: any) => {
  const dispatch = useDispatch()

  const getMessage = (request: any) => {
    let header = request.type
    let prefix = request.type
    switch (request.type) {
      case "JOIN":
        header = "JOIN REQUEST"
        prefix = props.isCaptain ? "Sent by user" : "Sent to team"
        break

      case "INVITATION":
        header = "INVITATION"
        prefix = props.isCaptain ? "For user" : "From team"
        break
    }

    const bodyContent = props.isCaptain ? request.user.email : request.team.name
    const body = `${prefix} <${bodyContent}>`

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
    <div className={styles.tableRow}>
      <div className={styles.newCell}>
        {props.isNew && props.content.type != types.cancel ? (
          <Typography noWrap variant="subtitle1" className={styles.new}>
            New
          </Typography>
        ) : null}
      </div>
      <div className={styles.message}>
        <Typography variant="h4" className={styles.messageHeader}>
          {message.header}
        </Typography>
        <Typography variant="subtitle1" className={styles.messageText}>
          {message.body}
        </Typography>
      </div>
      <div className={clsx(styles.buttonCell, styles.leftButton)}>
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
            <RectangleButton type="submit" className={styles.tableEntryButton}>
              Accept
            </RectangleButton>
          </form>
        ) : null}
      </div>
      <div className={clsx(styles.buttonCell, styles.rightButton)}>
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
            <RectangleButton type="submit" className={styles.tableEntryButton}>
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
            <RectangleButton type="submit" className={styles.tableEntryButton}>
              Cancel
            </RectangleButton>
          </form>
        )}
      </div>
    </div>
  )
}

export default Message
