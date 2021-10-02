import {
    Button,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement } from "react";
  
  const useStyles = makeStyles((theme) => ({
    burgerLine: {
        width: "2rem",
        height: "0.25rem",
        backgroundColor: "black",
        borderRadius: "10px",
        transition: "all 0.3s linear",
        position: "relative",
        transformOrigin: "1px",
    },
    burgerWrapper: {
        position: "absolute",
        top: "5%",
        right: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "2rem",
        height: "2rem",
        border: "none",
        cursor: "pointer",
        padding: "0",
    },
  }));
  
  const Burger = (): ReactElement => {
    const theme = useTheme();
    const classes = useStyles(theme);
  
    return (
        <div className={classes.burgerWrapper}>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
            <div className={classes.burgerLine}></div>
        </div>
    );
  };
  
  export default Burger;
