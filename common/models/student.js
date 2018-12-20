'use strict';

module.exports = function(Student) {
    Student.enrollCourse = function(cb) {
        cb(null, response);
      };
 
    Student.remoteMethod(
        'enrollCourse', {
          http: {
            path: '/enrollCourse',
            verb: 'post',
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
