import Product from '@/types/Product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface CartState {
  items: Product[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
      state.totalPrice += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.totalPrice -= state.items[action.payload].price;
      state.items.splice(action.payload, 1);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.items;
export const selectCartTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartTotalCount = (state: RootState) =>
  state.cart.items.length;

export default cartSlice.reducer;
