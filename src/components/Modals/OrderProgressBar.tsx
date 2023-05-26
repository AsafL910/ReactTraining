import BaseComponentProps from "@/types/BaseComponentProps";
import Alert from "../Alert";
import { LinearProgress } from "@mui/material";


interface OrderProgressBarProps extends BaseComponentProps {
  isOpen: boolean;
  value: number;
  maxValue: number;
}
const OrderProgressBar = (props: OrderProgressBarProps) => {
  const progress =
    props.maxValue !== 0 ? (props.value / props.maxValue) * 100 : 100;
  return (
    <Alert isOpen={props.isOpen} severity="info" testid={`alert_${props.testid}`}>
      <LinearProgress
        sx={{
          width: "200px"
        }}
        data-testid={`progress-bar_${props.testid}`}
        variant="determinate"
        value={progress}
        />
    </Alert>
  );
};

export default OrderProgressBar;
