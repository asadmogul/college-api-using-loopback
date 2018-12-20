'use strict';

module.exports = function(Admin) {

    var app = Admin.app;

    Admin.enrollSt = function(cb) {
        cb(null, response);
      };
    Admin.remoteMethod(
        'enrollSt', {
          http: {
            path: '/enrollSt',
            verb: 'post',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );

    Admin.addCourse = function(cb) {
        cb(null, response);
      };
    Admin.remoteMethod(
        'addCourse', {
          http: {
            path: '/addCourse',
            verb: 'post',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );
    Admin.removeCourse = function(cb) {
        cb(null, response);
      };
    Admin.remoteMethod(
        'removeCourse', {
          http: {
            path: '/removeCourse',
            verb: 'delete',
          },
          returns: {
            arg: 'status',
            type: 'string',
          },
        }
    );
    // Admin.app.models.Student

};
