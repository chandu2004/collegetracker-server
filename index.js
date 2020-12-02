var express = require('express');
var config = require('config');
var mongoose = require('mongoose');
var studentController = require('./controllers/student-controller');
var collegeController = require('./controllers/college-controller');
var jsf = require('json-schema-faker');


var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
// get all colleges
app.get('/colleges', collegeController.getColleges);

// get college by id
app.get('/college/:id', collegeController.getCollege);

// group colleges by state and course
app.get('/colleges/group', collegeController.groupColleges);

// get all students
app.get('/students', studentController.getStudents);

// get student by id
app.get('/student/:id', studentController.getStudent);

// get students by college
app.get('/students-by-college/:college', studentController.getStudentsByCollege);

app.get('/test', function(req, res) {
  res.send("server is listening to your requests");
});
// connect to db
var conn_string = config.get('DB_CONNECTION_STRING');
mongoose.connect(conn_string, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.once('open', () => {
  console.log('Database connected:', conn_string);
})
db.on('error', err => {
  console.error('connection error:', err)
});

// Start express server
var port = process.env.PORT || config.get('PORT');
app.listen(port, () => {
    console.log("Express server running port " + port);
});

