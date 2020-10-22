import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_MY_ORDERS_FAILURE,
  ORDER_MY_ORDERS_REQUEST,
  ORDER_MY_ORDERS_SUCCESS,
  ORDER_MY_ORDERS_RESET,
  ORDER_ALL_REQUEST,
  ORDER_ALL_FAILURE,
  ORDER_ALL_SUCCESS,
  ORDER_ALL_RESET,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_FAILURE,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, success: true, order: payload };
    case ORDER_CREATE_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  { type, payload },
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, order: payload };
    case ORDER_DETAILS_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_PAY_REQUEST:
      return { ...state, loading: true };
    case ORDER_PAY_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_PAY_FAILURE:
      return { ...state, error: payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_DELIVERED_REQUEST:
      return { ...state, loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_DELIVERED_FAILURE:
      return { ...state, error: payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMyOrdersReducer = (
  state = { orders: [] },
  { type, payload },
) => {
  switch (type) {
    case ORDER_MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case ORDER_MY_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ORDER_MY_ORDERS_RESET:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};

export const ordersListReducer = (
  state = { orders: [] },
  { type, payload },
) => {
  switch (type) {
    case ORDER_ALL_REQUEST:
      return { ...state, loading: true };
    case ORDER_ALL_SUCCESS:
      return { ...state, orders: payload, loading: false, success: true };
    case ORDER_ALL_FAILURE:
      return { ...state, error: payload, loading: false };
    case ORDER_ALL_RESET:
      return { ...state, orders: [] };
    default:
      return state;
  }
};
