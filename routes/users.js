const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const random = require("../helper/random");
const mail = require("../helper/mail");

/* user import model */
const User = require("../models/User");
/* import jwt */
const jwt = require("jsonwebtoken");

/* user register */
router.post("/register", (req, res, next) => {
  const { fullname, email, password, repeat_password } = req.body;

  // if email or password or repeat_password is an empty then returns 0 back
  if (!email || !password || !repeat_password) {
    res.json({ status: false, message: "email or password is empty" });
    return 0;
  }

  // check for password and password confirm
  if (password != repeat_password) {
    res.json({
      status: false,
      message: "password and repeat_password are not match"
    });
    return 0;
  }

  // check for user, if user exists in db
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      // generate a confirmation number and send an email
      let confirmNum = random(10000, 99999);
      let emailBody = `
        <center><b>Confirmation number</b></center>
        <br>
        <center><b>${confirmNum}</b></center>
      `;
      mail(email, "Register Confirmation", emailBody);

      // password hashing
      bcrypt.hash(password, 10).then((hash) => {
        // inserting into db
        const user = new User({
          fullname,
          email,
          password: hash,
          confirmationNumber: confirmNum
        });
        const promise = user.save();
        promise
          .then((data) => {
            res.json({ status: true, "status-code": res.statusCode });
          })
          .catch((err) => {
            res.json(err);
          });
      });
    } else {
      res.json({ status: false, message: "User is alredy exists" });
    }
  });
});

/* user authenticate */
router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  // if email or password is empty then returns 0 back
  if (!email || !password) {
    res.json({ status: false, message: "email or password is empty" });
    return 0;
  }

  // find the user from db
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ status: "false", error: "user not authenticated" });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({ status: false, error: "user not authenticated" });
        } else {
          // const payload = { email };
          const payload = { email };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 96768 // for a week
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

/* User confirmation */
router.put("/confirm-user", (req, res) => {
  const { email, confirmationNumber } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (user.confirmationNumber == confirmationNumber) {
      const promise = User.findOneAndUpdate(email, {
        confirmed: true
      });
      promise
        .then((user) => {
          if (!user) {
            res.json({ status: false, message: "user does not found" });
          }
          res.json({ status: true, message: "User confirmation was successfully" });
        })
        .catch((err) => {
          res.json({ status: false, err });
        });
    } else {
      res.json({ status: false, message: "confirmation number is wrong"})
    }
  });
});

module.exports = router;
