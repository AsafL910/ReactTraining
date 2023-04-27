import CartPage from "@/components/CartPage";
import HomePage from "@/components/HomePage";
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
import Product from "./types/Product";

function App() {
  const [pageIndex, setPageIndex] = useState<string>("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageIndex(newValue);
  };

  const [cart, setCart] = useState<Array<Product>>([]);

  const addToCart = (p: Product): void => {
    setCart([...cart, p]);
  };

  const [userSum, setUserSum] = useState<number>(1000);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            data-testid={"total-sum_app-bar"}
            variant="h6"
          >{`סכום כולל: ${userSum}₪`}</Typography>
        </Toolbar>
      </AppBar>
      <TabContext value={pageIndex}>
        <TabList value={pageIndex} onChange={handleChange}>
          <Tab label={<Home />} value={"home"} />
          <Tab label={<ShoppingCart />} value={"cart"} />
        </TabList>
        <TabPanel key={"home"} value="home">
          <HomePage cart={cart} addToCart={addToCart} testid="home-page" />
        </TabPanel>
        <TabPanel key={"cart"} value="cart">
          <CartPage
            testid="cart-page"
            cart={cart}
            setCart={setCart}
            userSum={userSum}
            setUserSum={setUserSum}
          />
        </TabPanel>
      </TabContext>
    </>
  );
}

export default App;
