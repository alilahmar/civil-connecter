import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store/Store";
import decode from "jwt-decode";
import { userLoggedIn } from "./Redux/Actions/Auth";

// if (localStorage.getItem("token")) {
//   const myData = decode(localStorage.getItem("token"));
//   const user = {
//     token: localStorage.getItem("token"),
//     name: myData.user.name,
//     email: myData.user.email,
//   };

//   console.log("test3", myData);
// }

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,

  document.getElementById("root")
);

reportWebVitals();
