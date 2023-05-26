import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { removeFromCart, selectCart, selectCartTotalPrice } from "@/state/reducers/cartReducer";
import { orderProduct, selectCash } from "@/state/reducers/userReducer";
import BaseComponentProps from "@/types/BaseComponentProps";
import Product from "@/types/Product";
import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import Alert from "../Alert";
import CartItem from "../CartItem";
import OrderProgressBar from "../Modals/OrderProgressBar";
import OrderCompleteModal from "../Modals/OrderCompleteModal";

type OrderStatus = "none" | "ordering" | "complete" | "error";

const CartPage = (props: BaseComponentProps) => {
  const cash = useAppSelector(selectCash);
  const cart = useAppSelector(selectCart);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  const dispatch = useAppDispatch();

  const [orderStatus, setOrderStatus] = useState<OrderStatus>("none");
  const [orderedProducts, setOrderedProducts] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(cart.length);

  const isCartEmpty: boolean = cart.length === 0;

  const order = async (p: Product) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setOrderedProducts((previous) => previous + 1);
    dispatch(orderProduct(p));
    dispatch(removeFromCart(0));
  };
  
  const orderProducts = async () => {
    if (cash >= totalPrice) {
      setOrderStatus("ordering");
      for (let i = 0; i < cart.length; i++) {
        await order(cart[i]);
      }
      setOrderStatus("complete");
      setOrderedProducts(0);
    } else {
      setOrderStatus("error");
    }
  };
  return (
    <>
    <OrderCompleteModal
      testid={`order-complete-modal_${props.testid}`}
      isOpen={orderStatus === "complete"}
      handleClose={() => setOrderStatus("none")}
      text="תתחדש/י!"
      />
      {isCartEmpty ? (
        <Typography>העגלה ריקה</Typography>
        ) : (
          <>
          <Button
            data-testid={`order-button_${props.testid}`}
            variant="contained"
            size="large"
            onClick={orderProducts}
          >{`הזמן ${totalPrice.toFixed(2)}₪`}</Button>
          <List data-testid={`cart-list_${props.testid}`}>
            {cart.map((product: Product, index: number) => (
              <CartItem
                testid={`listitem-${index}_${props.testid}`}
                index={index}
                product={product}
                onDeleteClick={() => dispatch(removeFromCart(index))}
              />
            ))}
          </List>

          <OrderProgressBar
            testid={`order-bar_${props.testid}`}
            isOpen={orderStatus === "ordering"}
            value={orderedProducts}
            maxValue={productCount}
          />
          <Alert
            testid={`alert-error_${props.testid}`}
            isOpen={orderStatus === "error"}
            severity="error"
            children={<span>ההזמנה לא הושלמה</span>}
          />
        </>
      )}
    </>
  );
};

export default CartPage;
