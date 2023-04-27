import { Dialog, DialogTitle, LinearProgress } from "@mui/material";

interface OrderProgressModalProps {
  isOpen: boolean;
  value: number;
  maxValue: number;
  onClose: () => void;
}
const OrderProgressModal = (props: OrderProgressModalProps) => {
  const progress =
    props.maxValue !== 0 ? (props.value / props.maxValue) * 100 : 100;
  return (
    <Dialog onClose={props.onClose} open={props.isOpen}>
      <DialogTitle>ההזמנה מתבצעת</DialogTitle>
      <LinearProgress variant="determinate" value={progress} />
    </Dialog>
  );
};

export default OrderProgressModal;
