const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/Auth");
const { check, validationResult } = require("express-validator");

// require the models:
const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@Route    Get api/profile/me
//@desc     Get current users profile
//@access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    // check if there is no profile of this user
    if (!profile) {
      res.status(400).json({ msg: "There is no Profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@Route    Post api/profile
//@desc     Creat or Update user profile
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      linkedInUserName,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedIn,
    } = req.body;
    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (linkedInUserName) profileFields.linkedInUserName = linkedInUserName;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }
    // build social object
    profileFields.socialMedia = {};
    if (youtube) profileFields.socialMedia.youtube = youtube;
    if (twitter) profileFields.socialMedia.twitter = twitter;
    if (facebook) profileFields.socialMedia.facebook = facebook;
    if (linkedIn) profileFields.socialMedia.linkedIn = linkedIn;
    if (instagram) profileFields.socialMedia.instagram = instagram;

    try {
      // find it by user id
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // if profile update it
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@Route    Get api/profile
//@desc     Get all profiles
//@access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    // if (!profiles) {
    // return res.status(400).json({ msg: "there is no profile for this user" });
    // }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("server error");
  }
});
//@Route    Get api/profile/:user_id
//@desc     Get one profile by id
//@access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).json("server error");
  }
});

//@Route    Delete api/profile
//@desc     Delete one profile by id
//@access   Private

router.delete("/", auth, async (req, res) => {
  try {
    //
    // delete profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // delete User
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("can not delete profile");
  }
});

//@Route    Put api/profile/experience
//@desc     add profile experience
//@access   private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    // create an object
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // console.log(req.user);
      // to push experience into profile by unshift
      profile.experience.unshift(newExp);

      // save profile
      await profile.save();
      res.json(profile);
      // console.log(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@Route    Delete api/profile/experience/:exp_id
//@desc     delete profile experience
//@access   private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    // find profile according to the token and user id
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index from experience array
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@Route    Put api/profile/education
//@desc     add profile education
//@access   private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
      check("fieldOfStudy", "fieldOfStudy date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    // create an object
    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // console.log(req.user);
      // to push education into profile by unshift
      profile.education.unshift(newEdu);

      // save profile
      await profile.save();
      res.json(profile);
      // console.log(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@Route   Delete api/profile/education/:edu_id
//@desc    delete profile education
//@access  private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    // find profile according to the token and user id
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index from education array
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@Route   Get api/profile/github/:username
//@desc    Get user repos from github
//@access  public

router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
