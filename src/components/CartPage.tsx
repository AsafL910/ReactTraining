import Product from "@/types/Product";
import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";

import OrderProgressModal from "./OrderProgressModal";

interface CartPageProps {
  cart: Array<Product>;
  userSum: number;
  setUserSum: (sum: number) => void;
  setCart: (cart: Array<Product>) => void;
}
const CartPage = (props: CartPageProps) => {
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderedProducts, setOrderedProducts] = useState<number>(0);

  const totalPrice: number = props.cart.reduce(
    (total: number, product: Product) => total + product.price,
    0
  );

  const isCartEmpty = props.cart.length === 0;

  const orderProducts = () => {
    setIsOrdering(true);
    if (props.userSum >= totalPrice) {
      props.cart.forEach((product: Product, index: number) =>
        order(product, index)
      );
    }
  };

  const order = (p: Product, index: number) => {
    setTimeout(() => {
      props.setUserSum(props.userSum - p.price);
      setOrderedProducts((previous) => previous + 1);
      console.log("odrered" + p.name);

      if (index === props.cart.length - 1) {
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
          <List sx={{ width: "100%", direction: "rtl" }}>
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
                <ListItemText
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
        </>
      )}
    </>
  );
};

export default CartPage;
