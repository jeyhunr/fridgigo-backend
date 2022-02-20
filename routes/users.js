const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

/* user import model */
const User = require("../models/User");
/* import jwt */
const jwt = require("jsonwebtoken");

/* post users */
router.post("/register", (req, res, next) => {
  const { fullname, username, password, repeat_password } = req.body;
  // if username or password or repeat_password is empty then returns 0 back
  if (!username || !password || !repeat_password) {
    res.json({ status: false, message: "username or password is empty" });
    return 0;
  }
  // check for password
  if (password != repeat_password) {
    res.json({
      status: false,
      message: "password and repeat_password are not match"
    });

    return 0;
  }
  // password hashing
  bcrypt.hash(password, 10).then((hash) => {
    // inserting into db
    const user = new User({ fullname, username, password: hash });
    const promise = user.save();
    promise
      .then((data) => {
        res.json({ status: true, "status-code": res.statusCode });
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

/* post authenticate */
router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
  // if username or password is empty then returns 0 back
  if (!username || !password) {
    res.json({ status: false, message: "username or password is empty" });
    return 0;
  }

  // find the user from db
  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ status: "false", error: "user not authenticated" });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({ status: "false", error: "user not authenticated" });
        } else {
          // const payload = { username };
          const payload = { username };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 720
          });
          res.json({
            status: true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;
