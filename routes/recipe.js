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
 * POST
 * save recipess
 */
router.post("/add-recipe", (req, res, next) => {
  const { title,  ingredients, steps, category } = req.body;
  // insert into db
  const recipe = new Recipe({
    title: title,
    category: category,
    ingredients: ingredients,
    steps: steps
  });
  
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
