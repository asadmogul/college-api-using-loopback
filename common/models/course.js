'use strict';

var app = require('../../server/server');
var router = app.loopback.Router();

module.exports = function(Course) {
    Course.listCourse = function(cb) {
        Course.find({
            order: 'courseName ASC',
            fields: {
                courseName: true,
                creditHours: true,
                id: true
            }
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

    Course.myCourses = function(id, cb) {
        Course.find({
            where: {
            studentId: id
            }
        }, cb);
    };
     
    Course.remoteMethod(
            'myCourses', {
                accepts: {
                    arg: 'id', 
                    type: 'string'
                },
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
    Course.deleteCourses = function(name, cb) {
        Course.destroyAll({
            where: {
                courseName: name
            }
        }, cb);
    };

    Course.remoteMethod(
            'deleteCourses', {
                accepts: {
                    arg: 'courseName', 
                    type: 'string'
                },
                http: {
                    path: '/delete-courses',
                    verb: 'del',
                },
                returns: {
                    arg: 'status',
                    type: 'string',
                },
            }
    );



    Course.enrollCourse = function(cName, id,  cb) {
            Course.upsertWithWhere({
                where: {
                    courseName: cName
                }
            },
            {
                studentID: id
            }, 
            (err, instance) => {
                if (err) return console.error(err);
                console.log('Course created: ', instance);
            });
    };

    Course.remoteMethod(
        'enrollCourse', {
            accepts: [
                {arg: 'cName', type: 'string', required: true},
                {arg: 'id', type: 'string'}
            ],
            http: {
                path: '/enroll-courses',
                verb: 'put',
            },
            returns: {
                arg: 'status',
                type: 'string',
            },
        }
    );


};
