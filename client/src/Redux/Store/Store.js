import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../Reducers";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
