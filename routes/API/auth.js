const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const Auth = require("../../middleware/Auth");
const User = require("../../models/User");
// login user
//@Route    Get api/auth
//@desc     Test route
//@access   Public
router.get("/", Auth, async (req, res) => {
  try {
    // select password will leave off the password in the data
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("server error");
  }
});
//@Route    Get api/auth
//@desc     authenticate user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please enter your email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // check the errors in the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // to send request as model
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // see if user exist
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      // to compare if hashed password and entered password are same
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: { id: user.id },
      };

      //delete user["password"]; //remove password item from object

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );

      // res.status(200).send("User Registered");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
