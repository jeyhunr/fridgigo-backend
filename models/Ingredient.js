const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  idIngredient: {
    type: Number,
    required: true
  },
  strDescription: String,
  strIngredient: String,
  strType: String
});

module.exports = mongoose.model("ingredient", IngredientSchema);
