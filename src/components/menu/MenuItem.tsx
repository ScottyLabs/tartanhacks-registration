import {
    Link,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement } from "react";
  
  const useStyles = makeStyles((theme) => ({
    link: {
        "&:hover": {
          textDecoration: "none",
          filter: "brightness(85%)",
          cursor: "pointer"
        },
        color: "white",
        width: "100%",
      },
    menuLine: {
        position: "relative",
        width: "422px",
        height: "7px"
    },
    menuItem: {
        textAlign: "center",
        padding: "3em"
    }
  }));
  
  const MenuItem = ({
        text,
        url
    }: {
        text: string
        url: string
    }): ReactElement => {
    const theme = useTheme();
    const classes = useStyles(theme);
  
    return (
        <Link className={classes.link}>
        <div className={classes.menuItem}>
                <Typography variant="h5">
                    {text}
                </Typography>
        </div>
        </Link>
    );
  };
  
  export default MenuItem;
