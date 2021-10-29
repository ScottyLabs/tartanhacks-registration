import { makeStyles, Typography } from "@material-ui/core"
import EnvelopeEmpty from "./EnvelopeEmpty";


const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "40%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "22px"
    },
    margin: "0 auto"
  },
  headerDiv: {
    width: "100%",
    textAlign: "center",
    position: "relative",
    paddingTop: "42px"
  },
  envelope: {
    paddingTop: "42px",
    width: "64px",
    position: "absolute",
    right: "0",
    top: "0%",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "42px"
    },
  },
  hrDivider: {
    width: "25%",
    border: 0,
    height: "1px",
    borderTop: `1px solid ${theme.palette.gradient.start}`,
  },
}))


const ContentHeader = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.headerDiv}>
        <Typography variant="h4" className={classes.header}>
          {props.title}
        </Typography>
        <EnvelopeEmpty className={classes.envelope} />
      </div>
      <hr className={classes.hrDivider} />
    </>
  )
}

export default ContentHeader