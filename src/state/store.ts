import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './reducers/cartReducer';
import userCashReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userCashReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
