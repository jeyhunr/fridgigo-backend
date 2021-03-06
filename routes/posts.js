const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


/* POST Model */
const Post = require("../models/Post");

/* GET Posts from POST. */
router.get("/", (req, res, next) => {
  const promise = Post.find({}).sort({ createdAt: -1 });
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
  const email = req.decode.email;

  const post = new Post({
    email,
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

/* GET my posts
*  must be fixed
*/ 
router.get("/user/my-posts", (req, res) => {
  let token = req.body.token;

  res.json({
    status: true,
    posts: "Hello this is my first post"
  })
});

/* GET user's posts */
router.get("/user/:email", (req, res) => {
  //  qty: { $gt: 4 } } 
  const promise = Post.find(req.params).sort({ createdAt: -1 });
  promise
    .then((data) => {
      res.json({ status: true, posts: data });
    })
    .catch((err) => {
      res.json({ status: false, posts: err });
    });
});

module.exports = router;
