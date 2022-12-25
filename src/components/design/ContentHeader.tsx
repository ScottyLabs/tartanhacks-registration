import { Hidden, makeStyles, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  header: {
    fontWeight: 600,
    color: theme.palette.gradient.start,
    fontSize: "30px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "block",
    width: "50%",
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      fontSize: "28px",
      width: "70%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      fontSize: "22px",
      width: "80%",
      paddingBottom: "20px"
    }
  },
  longTitle: {
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      marginLeft: "0"
    }
  },
  headerDiv: {
    width: "100%",
    position: "relative",
    paddingTop: "42px",
    display: "flex",
    justifyContent: "center"
  },
  hrDivider: {
    width: "25%",
    border: 0,
    height: "1px",
    borderTop: `1px solid ${theme.palette.gradient.start}`
  }
}))

const ContentHeader = (props: any) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.headerDiv}>
        <Typography
          variant="h4"
          className={`${classes.header} 
          ${props.longTitle ? classes.longTitle : ""}`}
        >
          {props.title}
        </Typography>
      </div>
      <Hidden xsDown>
        <hr className={classes.hrDivider} />
      </Hidden>
    </>
  )
}

export default ContentHeader
