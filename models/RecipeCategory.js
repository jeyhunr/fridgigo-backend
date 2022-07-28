const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeCategorySchema = new Schema({
  title: String,
});

module.exports = mongoose.model("measure", MeasureSchema);