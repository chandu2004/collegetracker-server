const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
  Name: {type: String, required: true},
  YearFounded: {type: Number, required: true},
  City: {type: String, required: true},
  State: {type: String, required: true},
  Country: {type: String, required: true},
  MaxStudents: {type: Number, required: true},
  Courses: {type: [String], required: true}
});

// Export the collge model
module.exports = mongoose.model('College', CollegeSchema);