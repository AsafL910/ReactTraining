import CartPage from "@/components/Pages/CartPage";
import HomePage from "@/components/Pages/HomePage";
import { useState } from "react";

import { Home, ShoppingCart } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./App.css";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { addToCart } from "./state/reducers/cartReducer";
import Product from "./types/Product";

function App() {
  const [pageIndex, setPageIndex] = useState<string>("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageIndex(newValue);
  };

  const cart = useAppSelector((state) => state.cart);

  const cartDispatch = useAppDispatch();

  const handleAddToCart = (p: Product): void => {
    cartDispatch(addToCart(p));
  };

  const user = useAppSelector((state) => state.user);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            data-testid={"total-sum_app-bar"}
            variant="h6"
          >{`סכום כולל: ${user.cash.toFixed(2)}₪`}</Typography>
        </Toolbar>
      </AppBar>
      <TabContext value={pageIndex}>
        <TabList value={pageIndex} onChange={handleChange}>
          <Tab label={<Home />} value={"home"} />
          <Tab label={<ShoppingCart />} value={"cart"} />
        </TabList>
        <TabPanel key={"home"} value="home">
          <HomePage
            cart={cart.items}
            addToCart={handleAddToCart}
            testid="home-page"
          />
        </TabPanel>
        <TabPanel key={"cart"} value="cart">
          <CartPage testid="cart-page" />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default App;
