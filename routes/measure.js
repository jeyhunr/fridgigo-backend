const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/get-measures", (req, res, next) => {
  res.json({ statusCode: req.statusCode, message: "Success" });
});

module.exports = router;