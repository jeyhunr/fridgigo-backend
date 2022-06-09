const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const ingredientApiURI = process.env.INGREDIENT_API_URI;
const ingredientApiHost = process.env.INGREDIENT_API_HOST;
const ingredientApiKey = process.env.INGREDIENT_API_KEY;

/* GET */
router.get("/list-all-ingredients", (req, res, next) => {
  res.json({ status: true, message: "nothing found"})
});

module.exports = router;
