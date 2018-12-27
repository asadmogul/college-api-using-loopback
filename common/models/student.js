'use strict';

module.exports = function(Student) {
  var app = require('../../server/server');

    
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
