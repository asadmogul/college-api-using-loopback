'use strict';

module.exports = function(Student) {
  var app = require('../../server/server');
  var courses = app.models.Course;
  Student.myCourses = function(cb) {
    Student.find({

    }, cb);
  };
 
    Student.remoteMethod(
        'myCourses', {
          http: {
            path: '/my-courses',
            verb: 'get',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );
    
    Student.deleteCourse = function(cb) {
        cb(null, response);
      };
    Student.remoteMethod(
        'deleteCourse', {
          http: {
            path: '/deleteCourse',
            verb: 'delete',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );
};
