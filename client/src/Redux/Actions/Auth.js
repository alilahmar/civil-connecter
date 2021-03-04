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
import axios from "axios";
// import decode from "jwt-decode";
// Register user
export const register = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    // user ???
    const result = await axios.post("/api/users/", user);
    // cont userData = decode(result.data.token)
    // console.log("result", result);
    dispatch({ type: REGISTER_SUCCESS, payload: { ...result.data, user } });

    history.push(`CreateProfile`);
  } catch (err) {
    // const { errors, msg } = errors.response.data;
    // if (Array.isArray(errors)) {
    //   errors.forEach((err) => alert(err.msg));
    // }
    // if (msg) {
    //   alert(msg);
    // }
    console.log("can not save the user");
  }
};

export const userLoggedIn = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

// login user
export const loginUser = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post("/api/auth", user);

    //{user,msg,token}

    dispatch({ type: LOGIN_SUCCESS, payload: result.data });

    history.push(`CivilDashboard`);
  } catch (error) {
    console.log("can not log In");
  }
};

export const logOutUser = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  // history.push(`/`);
};
