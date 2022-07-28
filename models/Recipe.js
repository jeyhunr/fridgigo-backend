const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
  text: String
});

const IngredientSchema = new Schema({
  count: Number,
  increment: Number,
  meauser: String, // objectid from measure
  description: String
});

const NutritionFactsSchema = new Schema({
  cal: Number,
  carbs: Number,
  protein: Number,
  fat: Number
});

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: Schema.Types.ObjectId,
  preparation_time: Number,
  cooking_time: Number,
  servings: Number, 
  ingredients: [IngredientSchema],
  nutrition_facts: [NutritionFactsSchema],
  steps: [StepSchema]
});

module.exports = mongoose.model("recipe", RecipeSchema);
