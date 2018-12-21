'use strict';

var app = require('../../server/server');
var router = app.loopback.Router();

module.exports = function(Course) {
  

    Course.listCourse = function(cb) {
        Course.find({
            order: 'courseName DESC'
        }, cb);
      };
    Course.remoteMethod(
        'listCourse', {
          http: {
            path: '/list-courses',
            verb: 'get',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );

    // Course.enrollCourse = function(cb) {
    //     router.post('/enroll-courses', function(req, res) {
    //         var coursename = req.body.course;
    //         var cHours = req.body.cHours;
    //         var stId = req.body.stId;
    //         Course.upsert({
    //             courseName: coursename,
    //             creditHours: cHours,
    //             studentID: stId

    //         }, function(err, instance) {
    //             if (err) return console.error(err);
    //             console.log('Course created: ', instance);
    //         });
    //     });
    // };

    // Course.remoteMethod(
    //     'enrollCourse', {
    //       http: {
    //         path: '/enroll-course',
    //         verb: 'post',
    //       },
    //       returns: {
    //         arg: 'status',
    //         type: 'string',
    //       },
    //     }
    // );


};
