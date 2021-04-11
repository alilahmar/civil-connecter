import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { loginUser } from "../../Redux/Actions/Auth";

const SignIn = () => {
  const isAuth = useSelector((state) => state.userReducer.isAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  if (isAuth) {
    return <Redirect to="/CivilDashboard" />;
  }

  return (
    <div>
      SignIn
      <p>Sign into your account</p>
      email:
      <input
        value={email}
        name="email"
        placeholder="e-mail"
        onChange={(e) => setEmail(e.target.value)}
        // if i don't have that email in database redirect me to the signUp or alert there is not tht address mail
      />
      <br />
      password:
      <input
        type="password"
        value={password}
        name="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={() => {
          dispatch(loginUser({ email, password }, history));
        }}
      >
        LogIn
      </button>
      <p>
        Don't have an account?
        <Link to="/signUp">
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
