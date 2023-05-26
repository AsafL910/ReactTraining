import BaseComponentProps from "@/types/BaseComponentProps";

import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import {ReactNode} from "react"

interface AlertProps extends BaseComponentProps {
  isOpen: boolean;
  severity: AlertColor;
  children: ReactNode;
}

const Alert = (props: AlertProps) => {
  return (
    <Snackbar
      open={props.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        icon={false}
        data-testid={props.testid}
        variant="filled"
        severity={props.severity}
        slotProps={{closeButton: { sx: {display: "none"}}}}
      >
        {props.children}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
