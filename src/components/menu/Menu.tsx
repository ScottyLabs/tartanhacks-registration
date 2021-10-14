import {
    Link,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement, useState } from "react";
  
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
    menuWrapper: {
        position: "absolute",
        top: "15%",
        right: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "25%",
        borderRadius: "1em",
        border: "solid black 1px",
        padding: "1em",
        transform: "translateX(0%)",
    },
    link: {
        "&:hover": {
          textDecoration: "none",
          filter: "brightness(85%)",
          cursor: "pointer"
        }
      }
  }));
  
  const Menu = (): ReactElement => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = useState(false);
  
    return (
        <div>
            <div
            className={classes.burgerWrapper}
            onClick={() => setOpen(!open)}
            >
                <div className={classes.burgerLine}></div>
                <div className={classes.burgerLine}></div>
                <div className={classes.burgerLine}></div>
            </div>
            <div className={classes.menuWrapper}>
                <Link className={classes.link}>
                    Register
                </Link>
                <Link className={classes.link}>
                    Team
                </Link>
                <Link className={classes.link}>
                    Messages
                </Link>
                <Link className={classes.link}>
                    Logout
                </Link>
            </div>
        </div>
    );
  };
  
  export default Menu;
