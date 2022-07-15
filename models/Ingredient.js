const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  body: [{ type: String }]
});

module.exports = mongoose.model("ingredient", IngredientSchema);
