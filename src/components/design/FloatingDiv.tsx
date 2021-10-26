import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  floatingDiv: {
    position: "relative",
    top: "20%",
    width: "80%",
    margin: "auto",
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    boxSizing: "border-box",
    backgroundImage: `linear-gradient(316.54deg, rgba(255, 255, 255, 0.85) 
                        35.13%, rgba(255, 227, 227, 0.7565) 126.39%)`,
    boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
    backdropFilter: "blur(4px)",
    borderRadius: "25px",
    [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
      width: "90%",
      top: "15%"
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: "90%",
      top: "15%"
    }
  }
}))


const FloatingDiv = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.floatingDiv}>
      {props.children}
    </div>
  )
}

export default FloatingDiv