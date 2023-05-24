import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { removeFromCart } from "@/state/reducers/cartReducer";
import { orderProduct } from "@/state/reducers/userReducer";
import BaseComponentProps from "@/types/BaseComponentProps";
import Product from "@/types/Product";
import { useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

import Alert from "../Alert";
import CartItem from "../CartItem";
import OrderProgressModal from "../Modals/OrderProgressModal";

const CartPage = (props: BaseComponentProps) => {
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);

  const cartDispatch = useAppDispatch();
  const userDispatch = useAppDispatch();

  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderedProducts, setOrderedProducts] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOrderComplete, setIsOrderComplete] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(cart.items.length);

  const totalPrice: number = cart.items.reduce(
    (total: number, product: Product) => total + product.price,
    0
  );

  const isCartEmpty: boolean = cart.items.length === 0;

  const orderProducts = () => {
    if (user.cash >= totalPrice) {
      setIsOrdering(true);
      cart.items.forEach((product: Product, index: number) =>
        order(product, index)
      );
    } else {
      setIsError(true);
    }
  };

  const order = (p: Product, index: number) => {
    setTimeout(() => {
      setOrderedProducts((previous) => previous + 1);
      userDispatch(orderProduct(p));
      cartDispatch(removeFromCart(0));
      if (index === cart.items.length - 1) {
        setIsOrdering(false);
        setOrderedProducts(0);
        //TODO: success alert doesnt work here
        setIsOrderComplete(true);
      }
    }, index * 500);
  };

  return (
    <>
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
            {cart.items.map((product: Product, index: number) => (
              <CartItem
                testid={`listitem-${index}_${props.testid}`}
                index={index}
                product={product}
                onDeleteClick={() => cartDispatch(removeFromCart(index))}
              />
            ))}
          </List>
          <OrderProgressModal
            testid={`order-modal_${props.testid}`}
            isOpen={isOrdering}
            onClose={() => setIsOrdering(false)}
            value={orderedProducts}
            maxValue={productCount}
          />
          <Alert
            testid={`alert-error_${props.testid}`}
            isOpen={isError}
            handleClose={() => setIsError(false)}
            severity="error"
            message="ההזמנה לא הושלמה"
          />
          <Alert
            testid={`alert-success_${props.testid}`}
            isOpen={isOrderComplete}
            handleClose={() => setIsOrderComplete(false)}
            severity="success"
            message="ההזמנה הושלמה"
          />
        </>
      )}
    </>
  );
};

export default CartPage;
