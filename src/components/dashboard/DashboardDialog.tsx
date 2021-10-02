import {
    Button,
    Collapse,
    LinearProgress,
    Link,
    makeStyles,
    TextField,
    Typography
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import actions from "src/actions";
  import { RootState } from "types/RootState";
  
  const useStyles = makeStyles((theme) => ({
    dialog: {
      border: "solid black 1px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "25%",
      borderRadius: "1em",
      padding: "1em",
      margin: "0 auto"
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      },
    link: {
      "&:hover": {
        textDecoration: "none",
        filter: "brightness(85%)"
      }
    }
  }));
  
  const DashboardDialog = (): ReactElement => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    const loggedInEmail = useSelector(
      (state: RootState) => state?.auth?.data?.email
    );
  
    useEffect(() => {
      dispatch(actions.auth.login());
    }, []);
  
    return (
      <div className={classes.dialog}>
        <Collapse in={loading}>
            <LinearProgress />
        </Collapse>
        <div className={classes.dialogContent}>
            <Typography variant="h4">
                Your Status
            </Typography>
            <Typography variant="body1">
                Incomplete
            </Typography>
        </div>
      </div>
    );
  };
  
  export default DashboardDialog;
  