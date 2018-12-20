'use strict'


module.exports = (app) => {

    var Student = app.models.Student;
    var Course = app.models.Course;
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;    

    app.dataSources.db.automigrate('User',(err) => {
        if(err) throw err;

        var students = [
          {stName: 'Ali', roll: 21},
          {stName: 'Ahmad', roll: 22}
          ];
        var courses = [
          {
            courseName: 'SE',
            creditHours: '3'
          },
          {
            courseName: 'DB',
            creditHours: '4'
          },
          {
            courseName: 'Calculus',
            creditHours: '3'
          },
          {
            courseName: 'DS',
            creditHours: '4'
          },
          {
            courseName: 'OOP',
            creditHours: '4'        
          }
        ];

        var users = [
            {email: 'ali@leo.com', password: '123'},
            {email: 'ahmad@leo.com', password: '123'},
            {email: 'asad@leo.com', password: '123'}
        ];

        User.create(users, function(err, instance) {
            if (err) throw err;
        
            console.log('Created users:', instance);

            students[0].email = users[0].email;
            students[0].password = users[0].password;
            students[1].email = users[1].email;
            students[1].password = users[1].password;
            
            Student.create(students[0], (err, instance) => {
                if(err) return console.log(err);
                console.log('Student created: ', instance);
                courses[0].studentId = instance.id;
                courses[1].studentId = instance.id;
                Course.create(courses[0], function(err, instance) {
                    if (err) return console.error(err);
                    console.log('Course created: ', instance);
                });
                Course.create(courses[1], function(err, instance) {
                    if (err) return console.error(err);
                    console.log('Course created: ', instance);
                });
    
            });
        
            Student.create(students[1], (err, instance) => {
                if(err) return console.log(err);
                console.log('Student created: ', instance);
                courses[2].studentId = instance.id;
                courses[3].studentId = instance.id;
                courses[4].studentId = instance.id;
                Course.create(courses[2], function(err, instance) {
                    if (err) return console.error(err);
                    console.log('Course created: ', instance);
                });
                Course.create(courses[3], function(err, instance) {
                    if (err) return console.error(err);
                    console.log('Course created: ', instance);
                });    
                Course.create(courses[4], function(err, instance) {
                    if (err) return console.error(err);
                    console.log('Course created: ', instance);
                });

            });

            //create the admin role
            Role.create({
            name: 'admin'
            }, function(err, role) {
            if (err) throw err;
        
            console.log('Created role:', role);
        
            //make asad an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[2].id
            }, function(err, principal) {
                if (err) throw err;
        
                console.log('Created principal:', principal);
            });
            });
        });
    });

    function createAdmin(cb) {
        db.automigrate('Admin', function(err) {
          if (err) return cb(err);
          var Admin = app.models.Admin;
          Admin.create({
            email: 'asad@leo.com',
            password: '123'
          }, cb);
        });
    };
}