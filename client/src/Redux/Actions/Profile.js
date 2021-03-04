import {
  LOAD_PROFILES,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  REGISTER_PROFILE,
  ADD_PROFILE_FAIL,
} from "../Const/Profile";
import axios from "axios";

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: LOAD_PROFILES });
  try {
    const profile = await axios.get(`/api/profile`);
    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: profile.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILES_FAIL,
      payload: error,
    });
  }
};
// Add profile
export const addProfile = (profile, history) => async (dispatch) => {
  try {
    const result = await axios.post(`/api/profile`, profile, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    dispatch({
      type: REGISTER_PROFILE,
      payload: result.data,
    });
    history.push(`CivilDashboard`);
  } catch (error) {
    dispatch({ type: ADD_PROFILE_FAIL, payload: error });
  }
};
