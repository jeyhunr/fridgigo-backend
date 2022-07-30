const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StepSchema = new Schema({
  text: String
});

const MeasureSchema = new Schema({
  title: String,
});

const IngredientSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  count: Number,
  increment: Number,
  measure: MeasureSchema, 
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
  category: String,
  preparation_time: Number,
  cooking_time: Number,
  servings: Number, 
  ingredients: [IngredientSchema],
  nutrition_facts: NutritionFactsSchema,
  steps: [StepSchema]
});

module.exports = mongoose.model("recipe", RecipeSchema);
