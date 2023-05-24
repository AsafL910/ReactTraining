import Product from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserSlice {
  cash: number;
}

const initialState: UserSlice = {
  cash: 1000,
};

export const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    orderProduct: (state, action: PayloadAction<Product>) => {
      state.cash -= action.payload.price;
    },
  },
});

export const { orderProduct } = cartSlice.actions;

export default cartSlice.reducer;
