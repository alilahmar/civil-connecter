import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../Redux/Actions/Profile";
import "./CivilConnecters.css";
const CivilConnecters = () => {
  const dispatch = useDispatch();
  const profileReducer = useSelector((state) => state.profileReducer.profiles);
  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  return (
    <div>
      <h1>Hello User Name</h1>

      {/* <h1>I am civil connecters</h1>
      {!profileReducer ? <p>Loading</p> : <p>ali</p>} */}
    </div>
  );
};

export default CivilConnecters;
