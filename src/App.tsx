import CartPage from "@/components/Pages/CartPage";
import HomePage from "@/components/Pages/HomePage";
import { useState } from "react";

import { Home, ShoppingCart } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab, Badge } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./App.css";
import { useAppSelector } from "./state/hooks";
import { selectCartTotalCount } from "./state/reducers/cartReducer";
import { selectCash } from "./state/reducers/userReducer";

function App() {
  const [pageIndex, setPageIndex] = useState<string>("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageIndex(newValue);
  };

  const cartCount = useAppSelector(selectCartTotalCount);
  const userCash = useAppSelector(selectCash);

  return (
    <>
      <AppBar position="sticky" sx={{flexDirection :"row", justifyContent: "space-between"}}>
        <Toolbar >
          <Typography
            data-testid={"total-sum_app-bar"}
            variant="h6"
          >{`סכום כולל: ${userCash.toFixed(2)}₪`}</Typography>
        </Toolbar>
        <Badge sx={{margin: "20px"}} badgeContent={cartCount} color="warning">
        <ShoppingCart color="action" />
    </Badge>
      </AppBar>
      <TabContext value={pageIndex}>
        <TabList value={pageIndex} onChange={handleChange}>
          <Tab label={<Home />} value={"home"} />
          <Tab label={<ShoppingCart />} value={"cart"} />
        </TabList>
        <TabPanel key={"home"} value="home">
          <HomePage
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
