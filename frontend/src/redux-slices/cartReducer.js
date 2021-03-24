import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ""
  },
  reducers: {
    addToCartAction: (state, {payload}) => {
      const inCartIndex = state.cartItems.findIndex(i => i.product === payload.product)
      if (inCartIndex > -1) {
        state.cartItems[inCartIndex] = payload;
      } else {
        state.cartItems.push(payload)
      }
    },
    removeFromCartAction: (state, {payload}) => {
      state.cartItems = state.cartItems.filter(i => i.product !== payload)
    },
    saveAddress: (state, {payload}) => {
      state.shippingAddress = payload
    },
    savePaymentInState: (state, {payload}) => {
      state.paymentMethod = payload
    }
  }
})

export const {
  addToCartAction,
  removeFromCartAction,
  saveAddress,
  savePaymentInState
} = cartSlice.actions


export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const {
    data: { _id: product, name, image, price, countInStock },
  } = await axios.get(`/api/products/${id}`);
  dispatch(addToCartAction({ product, name, image, price, countInStock, quantity }));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch(removeFromCartAction(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
  dispatch(saveAddress(data));
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = method => dispatch => {
  dispatch(savePaymentInState(method));
  localStorage.setItem("paymentMethod", JSON.stringify(method));
};

export default cartSlice.reducer
