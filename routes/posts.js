const express = require("express");
const router = express.Router();

/* POST Model */
const Post = require("../models/Post");

/* GET Posts from POST. */
router.get("/", (req, res, next) => {
  const promise = Post.find({});
  promise
    .then((data) => {
      res.json({ status: true, posts: data });
    })
    .catch((err) => {
      res.json({ status: false, posts: err });
    });
});

/* POST Share a post */
router.post("/new", (req, res) => {
  const { postHeader, postDescription } = req.body;
  const username = req.decode.username;

  const post = new Post({
    username,
    postHeader,
    postDescription
  });
  const promise = post.save();
  promise
    .then((data) => {
      res.json({
        status: true,
        "status-code": res.statusCode
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
