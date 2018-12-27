'use strict';

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

      app.models.Course.find({
        order: 'courseName ASC'
      }, (err, instance) => {
        if(err) return err;
        res.render('courses', {
          username: token.user.username,
          accessToken: token.id,
          id: token.user.id,
          courseArray: instance,
          courseExist: false
        });
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
