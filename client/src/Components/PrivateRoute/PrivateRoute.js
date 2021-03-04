import React from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("token");

  if (isAuth) {
    return <Route exact component={Component} {...rest} />;
  }
  return <Redirect to="/SignUp" />;
};

export default PrivateRoute;
