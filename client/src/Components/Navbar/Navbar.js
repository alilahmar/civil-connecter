import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../Redux/Actions/Auth";

import "./Navbar.css";
const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state) => state.userReducer && state.userReducer.isAuth
  );
  console.log(isAuth);

  return (
    <div className="main-nav">
      <div className="sub-nav">
        <div className="home-nav">
          <img className="img-nav" src="helmetLogo.png" alt="logo" />
          <Link to="/">
            <h3 className="h-nav">Home</h3>
          </Link>
        </div>
        <nav>
          <ul className="ul-nav">
            <Link to="/CivilConnecters">
              <li className="li-nav">
                <span className="sp-nav">Civil Connecters</span>
              </li>
            </Link>
            <Link to="/AboutUs">
              <li className="li-nav">
                <img src="/aboutus.png"></img>
                <span className="sp-nav">About Us</span>
              </li>
            </Link>
            {!isAuth ? (
              <Link to="/signUp">
                <li className="li-nav">
                  <img src="/register.png" alt="register"></img>
                  <span className="sp-nav">Register</span>
                </li>
              </Link>
            ) : (
              <Link to="/signUp">
                <li className="li-nav">
                  {/* <img src="/dashboard.png" alt="dashboard"></img> */}
                  <span className="sp-nav">{/* Dashboard */}</span>
                </li>
              </Link>
            )}
            {!isAuth ? (
              <Link to="/signIn">
                <li className="li-nav">
                  <img src="/login.png" alt="login"></img>
                  <span className="sp-nav">Log In</span>
                </li>
              </Link>
            ) : (
              <li className="li-nav">
                <img src="/logout.png" alt="logout"></img>
                <Link to="/">
                  <span
                    className="sp-nav"
                    onClick={() => {
                      dispatch(logOutUser());
                    }}
                  >
                    Log out
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
