import {
    Link,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { useTheme } from "@material-ui/styles";
  import { ReactElement } from "react";
  
const useStyles = makeStyles((theme) => ({
    headerUnderline: {
        marginBottom: "1em"
    },
}));
  
const HeaderUnderline = (): ReactElement => {
    const theme = useTheme();
    const classes = useStyles(theme);
  
    return (
        <svg className={classes.headerUnderline} height="1" width="297" viewBox="0 0 297 1">
            <line y1="0.5" x2="297" y2="0.5" stroke="#AA5418"/>
        </svg>
    );
};
  
export default HeaderUnderline;
