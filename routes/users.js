const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

/* user import model */
const User = require("../models/User");
/* import jwt */
const jwt = require("jsonwebtoken");

/* post users */
router.post("/register", (req, res, next) => {
  const { username, password } = req.body;

  // password hashing
  bcrypt.hash(password, 10).then((hash) => {
    // inserting into db
    const user = new User({ username, password: hash });
    const promise = user.save();
    promise
      .then((data) => {
        res.json({ status: "ok", "status code": res.statusCode });
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

/* post authenticate */
router.post("/authenticate", (req, res) => {
  const { username, password } = req.body;
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
          const payload = { username };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 720,
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
