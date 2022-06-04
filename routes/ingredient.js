const express = require("express");
// const fetch = require("node-fetch");
const router = express.Router();
require("dotenv").config();

const ingredientApiURI = process.env.INGREDIENT_API_URI;
const ingredientApiHost = process.env.INGREDIENT_API_HOST;
const ingredientApiKey = process.env.INGREDIENT_API_KEY;

/* GET */
router.get("/list-all-ingredients", (req, res, next) => {
  const url = `${ingredientApiURI}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": `${ingredientApiHost}`,
      "X-RapidAPI-Key": `${ingredientApiKey}`
    }
  };

  // fetch(url, options)
  //   .then((res) => res.json())
  //   .then((json) => console.log(json))
  //   .catch((err) => console.error("error:" + err));
});

module.exports = router;
