const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  Name: {type: String, required: true},
  YearOfBatch: {type: Number, required: true},
  CollegeId: {type: String, required: true},
  Skills: {type: [String], required: true}
});

// Export the student model
module.exports = mongoose.model('Student', StudentSchema);