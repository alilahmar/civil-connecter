import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const CivilDashboard = () => {
  const userReducer = useSelector((state) => state.userReducer);
  console.log("Ali", userReducer);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>Hello{userReducer.user.name}</h1>
    </div>
  );
};

export default CivilDashboard;
