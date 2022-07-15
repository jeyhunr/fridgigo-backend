const express = require("express");
const Ingredient = require("../models/Ingredient");
const router = express.Router();

/* GET */
router.get("/list-all-ingredients", (req, res, next) => {
  const promise = Ingredient.find({});
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * POST
 * save ingredients
 */
router.post("/insert-ingredient", (req, res, next) => {
  const { header, body } = req.body;
  // insert into db
  const ingredient = new Ingredient({
    header: header,
    body: body
  });
  const promise = ingredient.save();
  promise
    .then((data) => {
      res.json({ status: true, "status-code": res.statusCode });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
