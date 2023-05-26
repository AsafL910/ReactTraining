import BaseComponentProps from "@/types/BaseComponentProps";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";

interface OrderCompleteModal extends BaseComponentProps {
  text: string;
  isOpen: boolean;
  handleClose: () => void;
}

const OrderCompleteModal = (props: OrderCompleteModal) => {

  return (
    <Dialog open={props.isOpen} onClose={props.handleClose}>
      <DialogTitle>{props.text}</DialogTitle>
      <DialogActions>
        <Button onClick={props.handleClose} autoFocus>
          סגור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCompleteModal;
