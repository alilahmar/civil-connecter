const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//@Route    Get api/users
//@desc     Test routes
//@access   Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please enter your email").isEmail(),
    check(
      "password",
      "Please enter your password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // to send request as model can write as bellow (or in findOne it can be email:req.body.email)
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // see if user exist
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }
      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // after hashing the password we can save it
      await user.save();
      // return jsonwebtoken
      const payload = {
        user: { id: user.id, name },
      };

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
