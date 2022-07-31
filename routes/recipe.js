const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

/* GET */
router.get("/list-all-recipes", (req, res, next) => {
  const promise = Recipe.find({});
  promise
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

/**
 * GET
 * get title and id of recipes
 */
router.get("/get-recipes", (req, res, next) => {
  const promise = Recipe.find({}, { _id: 1, title: 1 });
  promise
    .then((data) => res.json({ status: true, data }))
    .catch((err) => res.json({ status: false, err }));
});

/**
 * GET
 * get only entered recipe
 */
router.get("/get-recipe/:recipeID", (req, res, next) => {
  const promise = Recipe.findById({ _id: req.params.recipeID });
  promise
    .then((data) => res.json({ status: true, data }))
    .catch((err) => res.json({ status: false, err }));
});

/**
 * POST
 * save recipess
 */
router.post("/add-recipe", (req, res, next) => {
  const recipe = new Recipe(req.body);

  const promise = recipe.save();
  promise
    .then((data) => {
      res.json({ status: true, "status-code": res.statusCode });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
