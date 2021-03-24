import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false,
    products: [],
    topProducts: [],
    pages: null,
    page: null,
    productDetailsSuccess: false,
    productDetailsError: null,
    productDetailsLoading: false,
    productUpdateSuccess: false,
    productUpdateLoading: false,
    productUpdateError: null,
    productCreateLoading: false,
    productCreateSuccess: false,
    productCreateError: null,
    productDeleteLoading: false,
    productDeleteSuccess: false,
    productDeleteError: null,
    addReviewLoading: false,
    addReviewSuccess: false,
    addReviewError: null,
    topProductsLoading: false,
    topProductsSuccess: false,
    topProductsError: null,
    error: null,
    success: false,
    product: {},
  },
  reducers: {
    productListRequest: (state, { payload }) => {
      state.loading = true;
    },
    productListSuccess: (state, { payload }) => {
      state.loading = false;
      state.products = payload.products;
      state.pages = payload.pages;
      state.page = payload.page;
    },
    productListFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    productDetailsRequest: (state, { payload }) => {
      state.productDetailsLoading = true;
    },
    productDetailsSuccess: (state, { payload }) => {
      state.productDetailsLoading = false;
      state.product = payload;
    },
    productDetailsFailed: (state, { payload }) => {
      state.productDetailsLoading = false;
      state.productDetailsError = payload;
    },
    productDeleteRequest: (state, { payload }) => {
      state.productDeleteLoading = true;
    },
    productDeleteSuccess: (state, { payload }) => {
      state.productDeleteLoading = false;
      state.productDeleteSuccess = true;
    },
    productDeleteFailed: (state, { payload }) => {
      state.productDeleteLoading = false;
      state.productDeleteError = payload;
    },
    productCreateRequest: (state, { payload }) => {
      state.productCreateLoading = true;
    },
    productCreateSuccess: (state, { payload }) => {
      state.productCreateLoading = false;
      state.productCreateSuccess = true;
      state.product = payload;
    },
    productCreateFailed: (state, { payload }) => {
      state.productCreateLoading = false;
      state.productCreateError = payload;
    },
    productCreateReset: (state, { payload }) => {
      state.productCreateLoading = false;
      state.productCreateSuccess = false;
      state.productCreateError = null;
      state.product = {};
    },
    productUpdateRequest: (state, { payload }) => {
      state.productUpdateLoading = true;
    },
    productUpdateSuccess: (state, { payload }) => {
      state.productUpdateLoading = false;
      state.productUpdateSuccess = true;
      state.product = payload;
    },
    productUpdateFailed: (state, { payload }) => {
      state.productUpdateLoading = false;
      state.productUpdateError = payload;
    },
    productUpdateReset: (state, { payload }) => {
      state.product = {};
      state.productUpdateSuccess = false;
      state.productUpdateLoading = false;
    },
    productReviewRequest: (state, { payload }) => {
      state.addReviewLoading = true;
    },
    productReviewSuccess: (state, { payload }) => {
      state.addReviewLoading = false;
      state.addReviewSuccess = true;
    },
    productReviewFailed: (state, { payload }) => {
      state.addReviewLoading = false;
      state.addReviewError = payload;
    },
    topProductsRequest: (state, { payload }) => {
      state.topProductsLoading = true;
    },
    topProductsSuccess: (state, { payload }) => {
      state.topProductsLoading = false;
      state.topProductsSuccess = true;
      state.topProducts = payload;
    },
    topProductsFailed: (state, { payload }) => {
      state.topProductsLoading = false;
      state.topProductsError = payload;
    },
  },
});

export const {
  productListRequest,
  productListSuccess,
  productListFailed,
  productDetailsRequest,
  productDetailsSuccess,
  productDetailsFailed,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFailed,
  productCreateRequest,
  productCreateSuccess,
  productCreateFailed,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFailed,
  productUpdateReset,
  productReviewRequest,
  productReviewSuccess,
  productReviewFailed,
  topProductsRequest,
  topProductsSuccess,
  topProductsFailed,
} = productSlice.actions;

export const listProducts = (
  searchParam = '',
  pageNumber,
) => async dispatch => {
  try {
    dispatch(productListRequest());
    const { data } = await axios.get(
      `/api/products?searchParam=${searchParam}&pageNumber=${pageNumber}`,
    );
    dispatch(productListSuccess(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(productListFailed(error));
  }
};

export const listProductDetails = id => async dispatch => {
  try {
    dispatch(productDetailsRequest());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailsSuccess(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(productDetailsFailed(error));
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch(productDeleteRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch(productDeleteSuccess());
  } catch (error) {
    dispatch(productDeleteFailed(error.message));
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch(productCreateSuccess(data));
  } catch (error) {
    dispatch(productCreateFailed(error.message));
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch(productUpdateRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'Application/json',
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config,
    );
    dispatch(productUpdateSuccess(data));
  } catch (error) {
    dispatch(productUpdateFailed(error.message));
  }
};

export const addProductReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch(productReviewRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    await axios.post(`/api/products/${id}/reviews`, review, config);
    dispatch(productReviewSuccess());
  } catch (error) {
    dispatch(productReviewFailed(error.message));
  }
};

export const getTopRatedProducts = () => async dispatch => {
  try {
    dispatch(topProductsRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/products/top`, config);
    dispatch(topProductsSuccess(data));
  } catch (error) {
    dispatch(topProductsFailed('Server failure. Try again'));
  }
};

export default productSlice.reducer;
