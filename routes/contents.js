const express = require("express");
const router = express.Router();

// import content schema
const Content = require("../models/Content");

/* GET contents */
router.get("/", (req, res, next) => {
  const promise = Content.find({});
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/* add new content */
router.post("/new", (req, res) => {
  const content = new Content(req.body);
  const promise = content.save();
  promise
    .then((data) => {
      res.json({
          "status" : "ok",
          "status code" : res.statusCode
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
