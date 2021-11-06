import {
    Collapse,
    LinearProgress,
    Link,
    makeStyles,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox
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
    dialogText: {
        marginBottom: "1em",
        color: `${theme.palette.gradient.start}`,
    },
    bodyText: {
      color: `${theme.palette.gradient.start}`
    },
    emphasisText: {
      marginBottom: "1em",
      color: `${theme.palette.primary.main}`
    },
    buttonBox: {
      display: "flex",
      flexDirection: "row",
    },
    buttonSpacer: {
      width: "10px"
    }
}));

const ConfirmationDialog = (): ReactElement => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);
  const [loading, setLoading] = useState(false);
  
  const signatureLiabilityText = "Signature liability place holder."
  const signaturePhotoReleaseText = "Signature photo release place holder."
  const signatureCodeOfConductText = "Signature code of conduct place holder."
  const mlhCodeOfConductText = "MLH Code of Conduct place holder."
  const mlhEventLogisticsText = "MLH Event Logistics place holder."
  const mlhPromotionalText = "MLH promotional place holder."

  useEffect(() => {
    dispatch(actions.auth.login());
  }, []);

  return (
    <div className={classes.dialog}>
        <Collapse in={loading}>
            <LinearProgress />
        </Collapse>
        <div className={classes.dialogContent}>
            <div className={classes.dialogText}>
                <Typography variant="h4">
                    Confirmation
                </Typography>
            </div>
            <div className={classes.dialogText}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label={signatureLiabilityText} />
                    <FormControlLabel control={<Checkbox />} label={signaturePhotoReleaseText} />
                    <FormControlLabel control={<Checkbox />} label={signatureCodeOfConductText} />
                    <FormControlLabel control={<Checkbox />} label={mlhCodeOfConductText} />
                    <FormControlLabel control={<Checkbox />} label={mlhEventLogisticsText} />
                    <FormControlLabel control={<Checkbox />} label={mlhPromotionalText} />
                </FormGroup>
            </div>
            <RectangleButton type="submit">
            COMPLETE YOUR APPLICATION
            </RectangleButton>
        </div>
    </div>
  );
  
};

export default ConfirmationDialog;
  