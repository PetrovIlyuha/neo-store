import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAILURE,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: payload, loading: false };
    case USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: payload };
    case USER_LOGOUT:
      return { ...state, loading: false, userInfo: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return { ...state, userInfo: payload, loading: false };
    case USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, user: payload, loading: false };
    case USER_DETAILS_FAILURE:
      return { ...state, loading: false, error: payload };
    case USER_DETAILS_RESET:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { ...state, userInfo: payload, loading: false, success: true };
    case USER_UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, { type, payload }) => {
  switch (type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { ...state, users: payload, loading: false };
    case USER_LIST_FAILURE:
      return { ...state, loading: false, error: payload };
    case USER_LIST_RESET:
      return { ...state, users: [] };
    default:
      return state;
  }
};
