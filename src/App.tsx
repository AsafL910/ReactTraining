import CartPage from "@/components/CartPage";
import HomePage from "@/components/HomePage";
import { useState } from "react";

import { Home, ShoppingCart } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Tab } from "@mui/material";

import "./App.css";

function App() {
  const [pageIndex, setPageIndex] = useState<string>("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageIndex(newValue);
  };

  return (
    <TabContext value={pageIndex}>
      <TabList value={pageIndex} onChange={handleChange}>
        <Tab label={<Home />} value={"home"} />
        <Tab label={<ShoppingCart />} value={"cart"} />
      </TabList>
      <TabPanel key={"home"} value="home">
        <HomePage />
      </TabPanel>
      <TabPanel key={"cart"} value="cart">
        <CartPage />
      </TabPanel>
    </TabContext>
  );
}

export default App;
