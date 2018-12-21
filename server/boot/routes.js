module.exports = function(app) {
  var router = app.loopback.Router();

  router.get('/', function(req, res) {
    res.render('index', {
      loginFailed: false
    });
  });

  router.post('/courses', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    app.models.User.login({
      email: email,
      password: password
    }, 'user', function(err, token) {
      if (err)
        return res.render('index', {
          email: email,
          password: password,
          loginFailed: true
        });

      token = token.toJSON();

      res.render('courses', {
        username: token.user.username,
        accessToken: token.id,
        courseExist: false
      });
    });
  });  

  router.get('/courses', function(req, res) {
    res.render('courses', {
      courseExist: false
    });
  });

  router.post('/courses/enroll-courses', function(req, res) {
    var cName = req.body.courseName;
    var cHours = req.body.cHours;
    var t = req.body.access_token;
    console.log(t);
    
    
    app.models.User.find({where: {id: t, username: "Asad"}}, (err, instance) => {
      if(err){
        console.log('Only Admin can add course');
        return err;
      }
      app.models.Course.create({
        courseName: cName,
        creditHours: cHours
      }, function(err, instance) {
        if (err) 
          return res.render('courses', {
            courseName:cName,
            courseExist: true
          });

        instance = instance.toJSON();

        res.render('enroll-courses', app.models.Course.find({
          order: 'courseName DESC'
        }, cb));
      });

      });


    });



  router.get('/logout', function(req, res) {
    var AccessToken = app.models.AccessToken;
    var token = new AccessToken({id: req.query['access_token']});
    token.destroy();

    res.redirect('/');
  });

  app.use(router);
};
