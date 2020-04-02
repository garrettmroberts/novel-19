const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {

  // Home page redirect
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  // Home page
  app.get('/home', (req, res) => {
    console.log('REQ.USER: ', req.user);
    if (req.user) {
      res.status(200).render('index', req.user);
    }
    else {
      // user not signed in
      res.status(206).render('index', req.user);
    }
  });

  // Member page
  app.get('/profile', isAuthenticated, (req, res) => {
    const userObj = {
      username: req.user.username,
      age: req.user.age,
      status: req.user.status
    };
    console.log(userObj);
    res.render('profile', userObj);
  });

  // Stats page
  app.get('/stats', (req, res) => {
    res.render('stats');
  });
};