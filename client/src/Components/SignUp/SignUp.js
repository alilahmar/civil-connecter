import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SignUp.css";

// import actions:
import { register } from "../../Redux/Actions/Auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="signup">
      <div className="signup-main">
        {/* <div className="signup-p"> */}
        <p className="signup-p">Create your account</p>
        {/* </div> */}
        <div className="signup-input">
          <input
            className="signup-inp"
            value={name}
            name="name"
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
          />
          <label className="signup-label" for="">
            Name
          </label>
          <br />
          <input
            className="signup-inp"
            value={email}
            name="email"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="signup-label" for="">
            Email
          </label>
          <br />
          <input
            type="password"
            className="signup-inp"
            value={password}
            name="password"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="signup-label" for="">
            Password
          </label>
          <br />
          <input
            type="password"
            className="signup-inp"
            value={password2}
            name="password2"
            placeholder=" "
            onChange={(e) => setPassword2(e.target.value)}
          />
          <label className="signup-label" for="">
            Check Password
          </label>
          <br />
        </div>
        <div className="signup-butt">
          <button
            className="signup-butt"
            onClick={() => {
              dispatch(register({ name, email, password, password2 }, history));
            }}
          >
            Register
          </button>
        </div>
        <div className="signup-log">
          <p className="signup-alr">
            Already have an account?
            <Link className="signup-spn" to="/signIn">
              <span className="signup-spn">Log In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
