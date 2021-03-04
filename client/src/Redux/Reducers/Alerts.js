// import { SET_ALERT, REMOVE_ALERT } from "../Const/Alerts";
// const initialState = [];

// export default function (state = initialState, action) {
//   const { type, payload } = action;
//   switch (type) {
//     case SET_ALERT:
//       // we can call action.payload.id/ action.payload.msg
//       return [...state, payload];
//     case REMOVE_ALERT:
//       // in this case payload is just id (payload it can be whatever you want)
//       return state.filter((alert) => alert.id !== payload);
//     default:
//       return state;
//   }
// }
