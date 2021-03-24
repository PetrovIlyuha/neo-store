import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    loadingPayment: false,
    loadingDelivery: false,
    successPayment: false,
    successDelivery: false,
    detailsLoading: false,
    detailsSuccess: false,
    loading: false,
    success: true,
    order: null,
    error: false,
    orderItems: [],
    shippingAddress: {},
    orders: [],
    myOrdersLoading: false,
    myOrdersError: null
  },
  reducers: {
    orderCreateRequest: (state, action) => {
      state.loading = true
    },
    ordersCreateSuccess: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.order = payload
    },
    ordersCreateFailure: (state, {payload}) => {
      state.loading = false;
      state.error = payload
    },
    orderDetailsRequest: (state, {payload}) => {
      state.detailsLoading = true
    },
    orderDetailsSuccess: (state, {payload}) => {
      state.detailsLoading = false;
      state.order = payload
    },
    orderDetailsFailure: (state, {payload}) => {
      state.detailsLoading = false;
      state.error = payload
    },
    orderPayRequest: (state, {payload}) => {
      state.loadingPayment = true;
    },
    orderPaySuccess: (state, {payload}) => {
      state.successPayment = true;
      state.loadingPayment = false;
    },
    orderPayFailure: (state, {payload}) => {
      state.error = payload
    },
    orderDeliverRequest: (state, {payload}) => {
      state.loadingDelivery = true
    },
    orderDeliverSuccess: (state, {payload}) => {
      state.loadingDelivery = false;
      state.successDelivery = true
    },
    orderDeliverFailed: (state, {payload}) => {
      state.error = payload
    },
    flushOrderOnLogout: (state, {payload}) => {
      state.orders = []
    },
    myOrdersRequest: (state, {payload}) => {
      state.myOrdersLoading = true
    },
    myOrdersSuccess: (state, {payload}) => {
      state.myOrdersLoading = false;
      state.orders = payload
    },
    myOrdersFailed: (state, {payload}) => {
      state.myOrdersLoading = false
      state.myOrdersError = payload
    },
    myOrdersReset: (state, {payload}) => {
      state.orders = []
    },
    allOrdersRequest: (state, {payload}) => {
      state.loading = true
    },
    allOrdersSuccess: (state, {payload}) => {
      state.loading = false;
      state.success = true;
      state.orders = payload
    },
    allOrdersFailed: (state, {payload}) => {
      state.error = payload
      state.loading = false
    },
    allOrdersReset: (state, {payload}) => {
      state.orders = []
    }
  },
  // extraReducers: {
  //   [createOrder.pending]: (state, action) => {
  //     state.loading = true;
  //   },
  //   [createOrder.fulfilled]: (state, {payload}) => {
  //     state.loading = false;
  //     state.success = true;
  //     state.order = payload
  //   }
  // }
})

export const {
  orderCreateRequest,
  ordersCreateSuccess,
  ordersCreateFailure,
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFailure,
  orderPayFailure,
  orderPayRequest,
  orderPaySuccess,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFailed,
  flushOrderOnLogout,
  myOrdersRequest,
  myOrdersSuccess,
  myOrdersFailed,
  myOrdersReset,
  allOrdersFailed,
  allOrdersSuccess,
  allOrdersRequest,
  allOrdersReset
} = ordersSlice.actions

// const createOrder = createAsyncThunk('orders/create', async (order, {getState}) => {
//   const {userInfo} = getState()
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };
//   const { data } = await axios.post(`/api/orders`, order, config);
//   return data;
// })

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch(orderCreateRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);
    dispatch(ordersCreateSuccess(data));
  } catch (error) {
    dispatch(ordersCreateFailure(error.message));
  }
};

export const getOrderDetails = orderID => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${orderID}`, config);
    dispatch(orderDetailsSuccess(data));
  } catch (error) {
    dispatch(orderDetailsFailure(error.message));
  }
};


export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  try {
    dispatch(orderPayRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );
    dispatch(orderPaySuccess(data));
  } catch (error) {
    dispatch(orderPayFailure(error.message));
  }
};

export const deliverOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${orderId}/delivered`,
      {},
      config,
    );
    dispatch(orderDeliverSuccess(data));
  } catch (error) {
    dispatch(orderDeliverFailed(error.message));
  }
};


export const showMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch(myOrdersRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    dispatch(myOrdersSuccess(data));
  } catch (error) {
    dispatch(myOrdersFailed(error.message)
    );
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch(allOrdersRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);
    dispatch(allOrdersSuccess(data));
  } catch (error) {
    dispatch(allOrdersFailed(error.message));
  }
};

export default ordersSlice.reducer
