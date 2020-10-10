import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const {
    data: { _id: product, name, image, price, countInStock },
  } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: { product, name, image, price, countInStock, quantity },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = method => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: method });
  localStorage.setItem("paymentMethod", JSON.stringify(method));
};
