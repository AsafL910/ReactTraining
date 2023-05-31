import Product from '@/types/Product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface UserSlice {
  cash: number;
}

const initialState: UserSlice = {
  cash: 1000
};

export const cartSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    orderProduct: (state, action: PayloadAction<Product>) => {
      state.cash -= action.payload.price;
    }
  }
});

export const { orderProduct } = cartSlice.actions;

export const selectCash = (state: RootState) => state.user.cash;

export default cartSlice.reducer;
