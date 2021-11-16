import { Hidden, makeStyles, Typography, Snackbar } from "@material-ui/core"
import actions from "src/actions"
import RoundedButton from "src/components/design/RoundedButton"
import { useRouter } from "next/dist/client/router"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({
  newCell: {
    width: "60px",
  },
  new: {
    color: theme.palette.primary.main,
    fontSize: "20px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "100%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    }
  },
  message: {
    paddingRight: "15px",
    paddingLeft: "30px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "16px"
    }
  },
  tableEntryButton: {
    width: "100%",
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
      fontSize: "16px",
      height: "56px"
    }
  },
  buttonCell: {
    width: "15%",
    paddingLeft: "20px",
    paddingBottom: "30px",
    paddingTop: "10px",
  },
  row: {
    borderBottom: "7px solid #F7C06260",
  },
  messageHeader: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    display: "block",
    marginLeft: "0",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "22px",
      paddingBottom: "20px"
    }
  },
  messageText: {
    paddingTop: "30px",
    fontWeight: 400,
    color: theme.palette.gradient.start,
    fontSize: "20px",
    display: "block",
    wordWrap: "break-word",
  },
}))

const Message = (props: any) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useDispatch()

  const getMessage = (request: any) => {
    const header = request.type === "JOIN" ? "JOIN REQUEST" :
                   request.type === "INVITE" ? "INVITATION" :
                   request.type
    const body = ""
    return {
      header: header,
      body: body
    }
  }

  const message = getMessage(props.content)

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.newCell}>
          {
            props.isNew ? (
              <Typography noWrap variant="subtitle1" className={classes.new}>
                New
              </Typography>
            ) :
              null
          }
        </td>
        <td className={classes.message}>
          <Typography variant="h4" className={classes.messageHeader}>
            {message.header}
          </Typography>
        </td>
        <td className={classes.buttonCell}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <RoundedButton type="submit" className={classes.tableEntryButton}>
              Accept
            </RoundedButton>
          </form>
        </td>
        <td className={classes.buttonCell}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <RoundedButton type="submit" className={classes.tableEntryButton}>
              Reject
            </RoundedButton>
          </form>
        </td>
      </tr>
    </>
  )
}

export default Message
