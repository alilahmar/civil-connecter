import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  return (
    <div className="containerC">
      <div className="card">
        <div className="imageBox">
          <img src="./flower.jpg" alt="imageUser" />
        </div>
        <div className="contentC">
          <h2>company</h2>
          <p>website</p>
          <p>Location</p>
          <p>Status</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
