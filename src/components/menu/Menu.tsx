import {
    Hidden,
    Link,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement, useState } from "react";
  import MenuItem from "./MenuItem";
  import MenuLine from "./MenuLine";
  
  const useStyles = makeStyles((theme) => ({
    menuWrapper: {
        position: "absolute",
        top: "0",
        width: "100%",
        zIndex: 3,
    },
    burgerLine: {
        width: "3rem",
        height: "0.25rem",
        backgroundColor: `${theme.palette.primary.main}`,
        borderRadius: "10px",
        position: "relative",
        marginBottom: "2px",
    },
    burgerWrapper: {
        position: "absolute",
        top: "5%",
        right: "5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "2.5rem",
        height: "2.5rem",
        border: "none",
        cursor: "pointer",
        padding: "0",
    },
    menuBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "467px",
        padding: "1em",
        background: `${theme.palette.primary.main}`,
        boxShadow: "0px 4px 4px rgba(219, 121, 52, 0.5)",
        borderRadius: "10px",
    },
    menuOpen: {
        position: "absolute",
        top: "8em",
        right: "5em",
    },
    menuClosed: {
        visibility: "hidden",
    },
    menuLine: {
        position: "relative",
        width: "422px",
        height: "7px"
    },
    backContainer: {
        width: "100%",
    }
  }));
  
  const Menu = (): ReactElement => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = useState(false);
  
    return (
        <div className={classes.menuWrapper}>
            <div
            className={classes.burgerWrapper}
            onClick={() => setOpen(!open)}
            >
                <div className={classes.burgerLine}></div>
                <div className={classes.burgerLine}></div>
                <div className={classes.burgerLine}></div>
            </div>
            <div className={open ? classes.menuOpen : classes.menuClosed}>
                <div className={classes.menuBox}>
                    <MenuItem text="REGISTER" url=""/>
                    <MenuLine/>
                    <MenuItem text="TEAM" url=""/>
                    <MenuLine/>
                    <MenuItem text="BACK" url=""/>
                    <MenuLine/>
                    <MenuItem text="MESSAGES" url=""/>
                    <MenuLine/>
                    <MenuItem text="LOGOUT" url=""/>
                </div>
            </div>
        </div>
    );
  };
  
  export default Menu;
