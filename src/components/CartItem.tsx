import BaseComponentProps from "@/types/BaseComponentProps";
import Product from "@/types/Product";

import { Delete } from "@mui/icons-material";
import { Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

interface CartItemProps extends BaseComponentProps {
  index: number;
  product: Product;
  onDeleteClick: () => void;
}

const CartItem = (props: CartItemProps) => {
  return (
    <ListItem
      key={props.index}
      data-testid={`cart-item-${props.index}_${props.testid}`}
    >
      <ListItemAvatar>
        <img
          data-testid={`cart-item-image-${props.index}_${props.testid}`}
          src={props.product.image}
          height={"50px"}
          width={"50px"}
          style={{ borderRadius: "50px" }}
        />
      </ListItemAvatar>
      <ListItemText
        data-testid={`cart-item-text-${props.index}_${props.testid}`}
        sx={{ textAlign: "right", marginRight: "20px" }}
        primary={props.product.name}
        secondary={`${props.product.price}₪`}
      />
      <Button color="error" onClick={props.onDeleteClick}>
        <Delete />
      </Button>
    </ListItem>
  );
};

export default CartItem;
