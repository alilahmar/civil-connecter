import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../Redux/Actions/Profile";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./CivilConnecters.css";
const CivilConnecters = () => {
  const dispatch = useDispatch();
  const profileReducer = useSelector((state) => state.profileReducer.profiles);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  return (
    <div>
      <h1>Hello {userReducer.user.name}</h1>
      <h3>Here you can find all the profiles to contact them </h3>

      {!profileReducer ? (
        <p>Loading</p>
      ) : (
        profileReducer.map((profile) => (
          <div key={profile.id}>
            <ProfileCard profile={profile} />
          </div>
        ))
      )}
    </div>
  );
};

export default CivilConnecters;
