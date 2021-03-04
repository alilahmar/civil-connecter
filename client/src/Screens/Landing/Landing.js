import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import "./Landing.css";
const Landing = () => {
  return (
    <div className="dashboard">
      <div className="dash-p">
        <p className="dash-p1"> Civil Engineering Connecters</p>
        <p className="dash-p2">
          Create a profile/portfolio, share posts and get helps from other civil
          engineers and technicians
        </p>
      </div>
      <div className="buttons-dash">
        <Link to="/signUp">
          <button className="dashButton">Sign Up</button>
        </Link>
        <Link to="/signIn">
          <button className="dashButton">Log In</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
