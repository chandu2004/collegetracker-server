var Student = require('../models/student');

function getStudents(req, res, next) {
    Student.find(function (err, students) {
        if (err) return next(err);
        res.send(students);
    });
}

function getStudent(req, res, next) {
    Student.findById(req.params.id, function (err, student) {
        if (err) return next(err);
        res.send(student);
    });
}

function getStudentsByCollege(req, res, next) {
    Student.find( {CollegeId: req.params.college}, function (err, students) {
        if (err) return next(err);
        res.send(students);
    });
}

module.exports = {getStudents, getStudent, getStudentsByCollege}


// mongoimport --jsonArray --db oneshotai --collection students --file students_data.json
