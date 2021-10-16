import {
    Collapse,
    LinearProgress,
    Link,
    makeStyles,
    Typography
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement, useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import actions from "src/actions";
  import { RootState } from "types/RootState";
  import RectangleButton from "../design/RectangleButton";
  
  const useStyles = makeStyles((theme) => ({
      dialog: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
        borderRadius: "25px",
        padding: "2em",
        margin: "0 auto",
        flexDirection: "column",
        background: `linear-gradient(316.54deg, ${theme.palette.lightGradient.start} 35.13%, ${theme.palette.lightGradient.end} 126.39%)`,
        boxShadow: "0px 4px 4px rgba(200, 116, 56, 0.25)",
        backdropFilter: "blur(4px)",
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
        },
      },
      dialogItem: {
          marginBottom: "1em",
      },
  }));
  
  const DashboardDialog = (): ReactElement => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [loading, setLoading] = useState(false);
    const currentUser = useSelector((state: RootState) => state?.accounts?.data)
    const applicationComplete = false;
  
    useEffect(() => {
      dispatch(actions.auth.login());
    }, []);

    function logUser() {
      console.log(currentUser);
    }
  
    if (applicationComplete) {
      return (
        <div className={classes.dialog}>
          <Collapse in={loading}>
              <LinearProgress />
          </Collapse>
          <div className={classes.dialogContent}>
              <div className={classes.dialogItem}>
                <Typography variant="h4">
                    Your Status:
                </Typography>
              </div>
              <div className={classes.dialogItem}>
                <Typography variant="h4">
                    COMPLETE
                </Typography>
              </div>
              <div className={classes.dialogItem}>
                <Typography variant="body1">
                  Welcome back!
                </Typography>
              </div>
              <div className={classes.dialogItem}>
                <Typography variant="body1">
                  If you do not complete your application by _ _ _, you will not be admitted!
                </Typography>
              </div>
          </div>
          <RectangleButton type="submit">
            COMPLETE YOUR APPLICATION
          </RectangleButton>
          {/* <button onClick={logUser}>log user</button> */}
        </div>
      );
    }
    return (
      <div className={classes.dialog}>
        <Collapse in={loading}>
            <LinearProgress />
        </Collapse>
        <div className={classes.dialogContent}>
            <div className={classes.dialogItem}>
              <Typography variant="h4">
                  Your Status:
              </Typography>
            </div>
            <div className={classes.dialogItem}>
              <Typography variant="h4">
                  INCOMPLETE
              </Typography>
            </div>
            <div className={classes.dialogItem}>
              <Typography variant="body1">
                You still need to complete your application!
              </Typography>
            </div>
            <div className={classes.dialogItem}>
              <Typography variant="body1">
                If you do not complete your application by _ _ _, you will not be admitted!
              </Typography>
            </div>
        </div>
        <RectangleButton type="submit">
          COMPLETE YOUR APPLICATION
        </RectangleButton>
        {/* <button onClick={logUser}>log user</button> */}
      </div>
    );
  };
  
  export default DashboardDialog;
  