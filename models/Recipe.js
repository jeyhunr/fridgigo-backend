const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
  text: String
});

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  ingredients: [{ type: String }],
  steps: [StepSchema]
});

module.exports = mongoose.model("recipe", RecipeSchema);
