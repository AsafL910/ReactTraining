import Product from "@/types/Product";
import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import OrderProgressModal from "./OrderProgressModal";
import Alert from "./Alert";

interface CartPageProps {
  cart: Array<Product>;
  userSum: number;
  setUserSum: (sum: number) => void;
  setCart: (cart: Array<Product>) => void;
}
const CartPage = (props: CartPageProps) => {
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderedProducts, setOrderedProducts] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const totalPrice: number = props.cart.reduce(
    (total: number, product: Product) => total + product.price,
    0
  );

  const isCartEmpty = props.cart.length === 0;

  const orderProducts = () => {
    if (props.userSum >= totalPrice) {
      setIsOrdering(true);
      props.cart.forEach((product: Product, index: number) =>
        order(product, index)
      );
    } else {
      setIsError(true);
    }
  };

  const order = (p: Product, index: number) => {
    setTimeout(() => {
      setOrderedProducts((previous) => previous + 1);
      if (index === props.cart.length - 1) {
        props.setUserSum(props.userSum - totalPrice);
        setIsOrdering(false);
        setOrderedProducts(0);
        props.setCart([]);
      }
    }, index * 1000);
  };

  return (
    <>
      {isCartEmpty ? (
        <Typography>העגלה ריקה</Typography>
      ) : (
        <>
          <Button
            variant="contained"
            size="large"
            onClick={orderProducts}
          >{`הזמן ${totalPrice}₪`}</Button>
          <List >
            {props.cart.map((product: Product, index: number) => (
              <ListItem key={product.id + index}>
                <ListItemAvatar>
                  <img
                    src={product.image}
                    height={"50px"}
                    width={"50px"}
                    style={{ borderRadius: "50px" }}
                  />
                </ListItemAvatar>
                <ListItemText sx={{textAlign: "right", marginRight: '20px'}}
                  primary={product.name}
                  secondary={product.price}
                />
              </ListItem>
            ))}
          </List>
          <OrderProgressModal
            isOpen={isOrdering}
            onClose={() => setIsOrdering(false)}
            value={orderedProducts}
            maxValue={props.cart.length}
          />
          <Alert isOpen={isError} handleClose={()=> setIsError(false)} severity="error" message="ההזמנה לא הושלמה"/>
        </>
      )}
    </>
  );
};

export default CartPage;
