import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

interface AlertProps {
  isOpen: boolean;
  handleClose: () => void;
  severity: AlertColor;
  message: string;
}

const Alert = (props: AlertProps) => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={3000}
      onClose={props.handleClose}
    >
      <MuiAlert
        onClose={props.handleClose}
        variant="filled"
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
