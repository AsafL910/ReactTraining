
import HomePage from '@/components/HomePage';
import CartPage from '@/components/CartPage';


import {ShoppingCart, Home} from "@mui/icons-material"
import './App.css'
import {useState} from 'react'
import { Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function App() {
  const [pageIndex, setPageIndex] = useState<string>("home")
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPageIndex(newValue);
  };

  return (
    <TabContext value={pageIndex}>
     <TabList value={pageIndex} onChange={handleChange}>
      <Tab label={<Home/>} value={"home"}/>
      <Tab label={<ShoppingCart/>} value={"cart"}/>
      </TabList>
       <TabPanel value="home"><HomePage/></TabPanel>
       <TabPanel value="cart"><CartPage/></TabPanel>
    </TabContext>
  )
}

export default App
