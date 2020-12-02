var College = require('../models/college');

function getColleges(req, res, next) {
    if(Object.keys(req.query).length === 0) {
        College.find(function (err, colleges) {
            if (err) return next(err);
            res.send(colleges);
        });
    }    
    else if(req.query.state != undefined) {
        College.find({State: req.query.state}, function (err, colleges) {
            if (err) return next(err);
            res.send(colleges);
        });
    } 
    else if(req.query.course != undefined) {
        College.find({Courses: req.query.course}, function (err, colleges) {
            if (err) return next(err);
            res.send(colleges);
        });
    }
}

function getCollege(req, res, next) {
    var college_details = {};
    var similar_colleges = [];
    College.findById(req.params.id, function (err, college) {
        if (err) return next(err);
        college_details['college'] = JSON.parse(JSON.stringify(college));

        //find similar colleges based on location and no of students
        College.find({State: college_details.college.State, StudentsCount: { $gt: (college_details.college.StudentsCount-100), $lt: (college_details.college.StudentsCount + 100) }}, function (err, _colleges) {
            if (err) {
                console.log("error " + err);
                return next(err);
            }
            colleges = JSON.parse(JSON.stringify(_colleges));

            // Filter colleges with similar courses
            colleges.forEach(
                element => {
                    let found = college_details.college.Courses.some(r=> element.Courses.indexOf(r) >= 0);
                    if(found && college_details.college._id != element._id) {
                        similar_colleges.push(element);
                    }
            })
            college_details['similar_colleges'] = JSON.parse(JSON.stringify(similar_colleges));
            res.send(college_details);
        });
    });
}

function groupColleges(req, res, next) {
    var agg = [];
    if(req.query.state == "true") {
        agg = [
            {$project: { _id: 0, State: 1 } },
            {$group: {_id: "$State", count: {$sum: 1} }},
            {$project: { _id: 0, State: "$_id", count: 1 } },
            {$sort: { count: -1 } }
        ];
    }

    if(req.query.course == "true") {
        agg = [
            {$project: { _id: 0, Courses: 1 } },
            {$unwind: "$Courses" },
            {$group: { _id: "$Courses", count: { $sum: 1 } }},
            {$project: { _id: 0, Course: "$_id", count: 1 } },
            {$sort: { count: -1 } }
        ]
    }

    College.aggregate(agg, function(err, response) {
        if(err) return next(err);
        res.send(response);
    })
}

module.exports = {getCollege, getColleges, groupColleges}

// mongoimport --jsonArray --db oneshotai --collection colleges --file colleges_data.json