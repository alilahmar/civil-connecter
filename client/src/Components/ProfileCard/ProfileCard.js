import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ profile }) => {
  return (
    <div className="containerC">
      <div className="card">
        <div className="imageBox">
          <img src="./flower.jpg" alt="imageUser" />
        </div>
        <div className="contentC">
          <h2>company {profile.company}</h2>
          <p>website{profile.website}</p>
          <p>Location{profile.location}</p>
          <p>Status{profile.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
