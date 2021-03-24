import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { flushOrderOnLogout } from './ordersReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: '',
    loading: false,
    error: '',
    user: {},
    users: [],
    success: false,
    updateUserSuccess: false,
    updateUserError: null,
    updateUserLoading: false,
    updateUserProfileLoading: false,
    updateUserProfileSuccess: false,
    updateUserProfileError: null,
    deleteUserLoading: false,
    deleteUserSuccess: false,
    deleteUserError: null,
    message: '',
  },
  reducers: {
    userLoginRequest: (state, action) => {
      if (!state.loading) {
        state.loading = true;
      }
    },
    userLoginSuccess: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    userLoginFailure: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    userRegisterRequest: (state, { payload }) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.success = true;
    },
    userRegisterFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state, action) => {
      state.loading = false;
      state.userInfo = null;
    },
    userDetailsRequest: (state, action) => {
      state.loading = true;
    },
    userDetailsSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.success = true;
    },
    userDetailsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    userDetailsReset: (state, { payload }) => {
      state.user = {};
    },
    updateProfileRequest: (state, { payload }) => {
      state.updateUserProfileLoading = true;
    },
    updateProfileSuccess: (state, { payload }) => {
      state.userInfo = payload;
      state.updateUserProfileLoading = false;
      state.updateUserProfileSuccess = true;
    },
    updateProfileFailed: (state, { payload }) => {
      state.updateUserProfileLoading = false;
      state.updateUserProfileError = payload;
    },
    userListRequest: (state, { payload }) => {
      state.loading = true;
    },
    userListSuccess: (state, { payload }) => {
      state.users = payload;
      state.loading = false;
    },
    userListFailed: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    userListReset: (state, { payload }) => {
      state.users = [];
    },
    userDeleteRequest: (state, { payload }) => {
      state.deleteUserLoading = true;
    },
    userDeleteSuccess: (state, { payload }) => {
      state.deleteUserLoading = false;
      state.deleteUserSuccess = true;
      state.message = payload;
    },
    userDeleteFailed: (state, { payload }) => {
      state.deleteUserLoading = false;
      state.error = payload;
    },
    userUpdateRequest: (state, { payload }) => {
      state.updateUserLoading = true;
    },
    userUpdateSuccess: (state, { payload }) => {
      state.updateUserLoading = true;
      state.updateUserSuccess = true;
      state.user = payload;
    },
    userUpdateFailed: (state, { payload }) => {
      state.updateUserLoading = false;
      state.updateUserError = payload;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userRegisterRequest,
  userRegisterSuccess,
  userRegisterFailed,
  userLogout,
  userDetailsRequest,
  userDetailsSuccess,
  userDetailsFailure,
  userDetailsReset,
  userUpdateRequest,
  userUpdateSuccess,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,
  userListRequest,
  userListSuccess,
  userListFailed,
  userListReset,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFailed,
  userUpdateFailed,
} = userSlice.actions;

export const login = (email, password) => async dispatch => {
  try {
    dispatch(userLoginRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      {
        email,
        password,
      },
      config,
    );
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    const error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userLoginFailure(error));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userInfo');
  dispatch(userLogout());
  dispatch(flushOrderOnLogout());
  dispatch(userDetailsReset());
  dispatch(userListReset());
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch(userRegisterRequest());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users',
      {
        name,
        email,
        password,
      },
      config,
    );
    dispatch(userRegisterSuccess(data));
    dispatch(userLoginSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userRegisterFailed(error));
  }
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch(userDetailsRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch(userDetailsSuccess(data));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userDetailsFailure(error));
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch(updateProfileRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch(updateProfileSuccess(data));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(updateProfileFailed(error));
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch(userListSuccess(data));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userListFailed(error));
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch(userDeleteRequest());
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/users/${id}`, config);
    dispatch(userDeleteSuccess(data.message));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userDeleteFailed(error));
  }
};

export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch(userUpdateRequest());
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(userUpdateSuccess(data));
  } catch (err) {
    let error =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch(userUpdateFailed(error));
  }
};

export default userSlice.reducer;
