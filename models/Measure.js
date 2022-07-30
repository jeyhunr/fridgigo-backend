const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeasureSchema = new Schema({
  title: String,
});

module.exports = mongoose.model("measure", MeasureSchema);
