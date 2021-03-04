import {
  LOAD_PROFILES,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  REGISTER_PROFILE,
  ADD_PROFILE_FAIL,
} from "../Const/Profile";

const initialState = {
  profile: {},
  profiles: [],
  loadProfile: false,
  error: null,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PROFILES:
      return {
        ...state,
        loadProfile: true,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        loadProfile: false,
        // check payload.profiles
        profiles: payload.profiles,
      };

    case GET_PROFILES_FAIL:
      return {
        ...state,
        loadProfile: false,
        error: payload,
      };
    case REGISTER_PROFILE:
      localStorage.getItem("token", payload.token);
      return {
        ...state,
        profile: payload,
      };
    case ADD_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
