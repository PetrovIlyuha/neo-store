import { configureStore } from "@reduxjs/toolkit";

import userSlice from './redux-slices/userReducer'
import productSlice from './redux-slices/productReducer'
import cartSlice from './redux-slices/cartReducer'
import ordersSlice from './redux-slices/ordersReducer'

const store = configureStore({
  reducer: {
    users: userSlice,
    products: productSlice,
    cart: cartSlice,
    orders: ordersSlice
  }
})

export default store;
