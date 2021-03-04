import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  CURRENT_USER,
  LOAD_USER,
  GET_USER_SUCCESS,
  DELETE_USER,
  UPDATE_USER,
} from "../Const/Auth";
const initialState = {
  user: {},
  users: [],
  loadUser: false,
  loadUsers: false,
  isAuth: localStorage.getItem("token") ? true : false,
  errors: null,
};
export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS: {
      console.log("payload", payload);
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        isAuth: true,
        loadUser: false,
      };
    }

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loadUser: false,
      };

    case LOGIN_SUCCESS:
      console.log("testing login success");
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: payload.user,
        isAuth: true,
        loadUser: false,
      };

    case LOGOUT_USER:
      localStorage.removeItem("token");
      return { user: null, loadUser: false, errors: null, isAuth: false };
    default:
      return state;
  }
};
