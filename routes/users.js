const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const random = require("../helper/random");
const mail = require("../helper/mail");

/* user import model */
const User = require("../models/User");
/* import jwt */
const jwt = require("jsonwebtoken");

/* import jwt verify */
const verifyJWT = require("../middleware/verify-jwt");

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
      message: "password and repeat_password are not match",
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
        Dear ${fullname},
        <br> <br>
        welcome to fridgiGO.
        <br> <br>
        Your confirmation number is <b>${confirmNum}</b>.
        <br> <br>
        Best regards,
        <br>
        fridgiGO Team
      `;
      mail(email, "Register Confirmation", emailBody);

      // password hashing
      bcrypt.hash(password, 10).then((hash) => {
        // inserting into db
        const user = new User({
          fullname,
          email,
          password: hash,
          confirmationNumber: confirmNum,
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
    if (!user || !user.confirmed) {
      res.json({ status: "false", error: "user not authenticated" });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({ status: false, error: "user not authenticated" });
        } else {
          // const payload = { email };
          const payload = { email };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 96768, // for a week
          });
          res.json({
            status: true,
            token,
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
      const promise = User.findByIdAndUpdate(user.id, {
        confirmed: true,
      });
      promise
        .then((user) => {
          if (!user) {
            res.json({ status: false, message: "user does not found" });
          }
          let emailBody = `
          Dear ${user.fullname},
          <br> <br>
          thank you for registration.
          <br> <br>
          Your account has been verified.
          <br> <br>
          Best regards,
          <br>
          fridgiGO Team
         `;
          mail(email, "Account confirmation", emailBody);
          res.json({
            status: true,
            message: "Your accound was successfully created",
          });
        })
        .catch((err) => {
          res.json({ status: false, err });
        });
    } else {
      res.json({ status: false, message: "confirmation number is wrong" });
    }
  });
});

/* password forget */
router.put("/request-password", (req, res) => {
  const { email } = req.body;
  // check for user, if user exists in db
  User.findOne({ email }, (err, user) => {
    if (err) throw err;
    if (user && user.confirmed) {
      // generate a confirmation number and send an email
      let confirmNum = random(10000, 99999);
      let emailBody = `
        Dear ${user.fullname},
        <br> <br>
        your confirmation number ist <b>${confirmNum}</b>.
        <br> <br>
        Best regards,
        <br>
        fridgiGO Team
      `;
      mail(email, "Password Forget", emailBody);

      const promise = User.findByIdAndUpdate(user.id, {
        confirmationNumber: confirmNum,
      });
      promise
        .then((user) => {
          if (!user) {
            res.json({ status: false, message: "user does not found" });
          }
          res.json({
            status: true,
            message: "The user confirmation number was sent successfully",
          });
        })
        .catch((err) => {
          res.json({ status: false, err });
        });
    } else {
      res.json({ status: false, message: "User not found" });
      return;
    }
  });
});

/* change password */
router.put("/change-password", (req, res) => {
  const { email, confirmationNumber, password, repeat_password } = req.body;
  if (!password || !repeat_password || password != repeat_password) {
    res.json({
      status: false,
      message: "Password and Repeat password does not match.",
    });
  } else {
    // check for user, if user exists in db
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      if (user && user.confirmed) {
        if (password == repeat_password) {
          if (user.confirmationNumber == confirmationNumber) {
            let emailBody = `
            Dear ${user.fullname},
            <br> <br>
            Your password has been changed.
            <br> <br>
            Best regards,
            <br>
            fridgiGO Team
          `;
            mail(email, "Password update confirmation", emailBody);

            // password hashing
            bcrypt.hash(password, 10).then((hash) => {
              // update in db
              const promise = User.findByIdAndUpdate(user.id, {
                password: hash,
              });
              promise
                .then((user) => {
                  if (!user) {
                    res.json({ status: false, message: "user does not found" });
                  }
                  res.json({
                    status: true,
                    message: "Password was changed.",
                  });
                })
                .catch((err) => {
                  res.json({ status: false, err });
                });
            });
          } else {
            res.json({ status: false, message: "confirmation number wrong" });
          }
        } else {
          res.json({
            status: false,
            message: "Password and repeat_password does not match",
          });
        }
      } else {
        res.json({ status: false, message: "something went wrong" });
      }
    });
  }
});

// get user info
router.get("/me", (req, res) => {
  const { token } = req.body;
  const { email } = verifyJWT(req, token);

  if (!email) {
    res.json({ status: false, message: "user not fount" });
  } else {
    // get user from database
    User.findOne({ email }, (err, user) => {
      if (err) throw err;
      const { email, fullname, following } = user;
      res.json({ status: true, email, fullname, following });
    });
  }
});

// follow user
router.put("/follow-user", (req, res) => {
  unFollowUser(req, res, "push");
});

// unfollow user
router.put("/unfollow-user", (req, res) => {
  unFollowUser(req, res, "pull");
});

const unFollowUser = (req, res, condition) => {
  const { token, targetEmail } = req.body;
  const { email } = verifyJWT(req, token);

  const resObj = { status: true, message: "user updated" };

  // cheking for error
  if (!email) {
    res.json({ status: false, message: "user not found" });
  }

  if (condition == "pull") {
    User.update({ email }, { $pull: { following: targetEmail } }, () => {
      res.json(resObj);
    });
  } else {
    User.update({ email }, { $push: { following: targetEmail } }, () => {
      res.json(resObj);
    });
  }
};

module.exports = router;
