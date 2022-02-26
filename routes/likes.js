const express = require("express");
const router = express.Router();

// import Like model
const Like = require("../models/Like");

/* GET get like */
router.get("/", (req, res) => {
  const { username, post_id } = req.body;
  const promise = Like.find({ username: username, post_id: post_id });
  promise
    .then((data) => {
      if (data != "") {
        res.json({ status: true, object_id: data[0]._id });
      } else {
        res.json({ status: false, message: "user did not like this post" });
      }
    })
    .catch((err) => {
      res.json({ status: false, error: err });
    });
});

/* POST like a post */
router.post("/like-post", (req, res) => {
  const { username, post_id } = req.body;
  const like = new Like({
    username,
    post_id
  });
  const promise = like.save();
  promise
    .then((data) => {
      res.json({
        status: true,
        message: "Liked successfully"
      });
    })
    .catch((err) => {
      res.json({ status: false, error: err });
    });
});

/* POST dislike a post */
router.delete("/dislike-post/:obj_id", (req, res) => {
  const promise = Like.findByIdAndRemove(req.params.obj_id);
  promise
    .then((like) => {
      if (!like) {
        res.json({ status: false, message: "This post can't be dislike." });
        return 0;
      }

      res.json({ status: true, message: "Dislike successfully" });
    })
    .catch((err) => {
      res.json({ status: false, error: err });
    });
});

module.exports = router;
