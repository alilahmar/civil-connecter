import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfile } from "../../Redux/Actions/Profile";

const CreateProfile = () => {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");

  const userReducer = useSelector((state) => state.userReducer);
  console.log("reducerUser", userReducer);
  // dispatch action
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Welcome {userReducer.user.name}</h3> <br />
      <h1>
        <strong>Create Your Profile</strong>
      </h1>
      <label for="company" class="labelInp">
        Company
      </label>
      <input
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        type="text"
        name="company"
        autocomplete="off"
      />
      <br />
      <label for="website" class="labelInp">
        Website
      </label>
      <input
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
        type="text"
        name="website"
        autocomplete="off"
      />
      <br />
      <label for="location" class="labelInp">
        Location
      </label>
      <input
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        type="text"
        name="location"
      />
      <br />
      <label for="status" class="labelInp">
        Status
      </label>
      <input
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        type="text"
        name="status"
        autocomplete="off"
      />
      <br />
      <label for="skills" class="labelInp">
        Skills
      </label>
      <input
        onChange={(e) => {
          setSkills(e.target.value);
        }}
        type="text"
        name="skills"
        autocomplete="off"
      />
      <br />
      <label for="bio" class="labelInp">
        Bio
      </label>
      <input
        onChange={(e) => {
          setBio(e.target.value);
        }}
        type="text"
        name="bio"
        autocomplete="off"
      />
      <br />
      <label for="twitter" class="labelInp">
        Twitter
      </label>
      <input
        onChange={(e) => {
          setTwitter(e.target.value);
        }}
        type="text"
        name="twitter"
        autocomplete="off"
      />
      <br />
      <label for="facebook" class="labelInp">
        Facebook
      </label>
      <input
        onChange={(e) => {
          setFacebook(e.target.value);
        }}
        type="text"
        name="facebook"
        autocomplete="off"
      />
      <br />
      <label for="linkedIn" class="labelInp">
        LinkedIn
      </label>
      <input
        onChange={(e) => {
          setLinkedIn(e.target.value);
        }}
        type="text"
        name="linkedIn"
        autocomplete="off"
      />
      <br />
      <label for="youtube" class="labelInp">
        Youtube
      </label>
      <input
        onChange={(e) => {
          setYoutube(e.target.value);
        }}
        type="text"
        name="youtube"
        autocomplete="off"
      />
      <br />
      <label for="instagram" class="labelInp">
        Instagram
      </label>
      <input
        onChange={(e) => {
          setInstagram(e.target.value);
        }}
        type="text"
        name="instagram"
        autocomplete="off"
      />
      <div>
        <button
          onClick={dispatch(
            addProfile({
              company,
              website,
              location,
              status,
              skills,
              bio,
              twitter,
              facebook,
              linkedIn,
              youtube,
              instagram,
            })
          )}
        >
          Save
        </button>
        <Link to="/SignUp">
          <button>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

export default CreateProfile;
