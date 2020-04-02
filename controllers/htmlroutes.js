const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {

  // Home page redirect
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  // Home page
  app.get('/home', (req, res) => {
    // User is signed in.
    if (req.user) {
      const data = {
        username: req.user.username,
        yearBorn: req.user.yearBorn,
        status: req.user.status
      };
      res.status(200).render('index', data);
    }
    else {
      // User not signed in.
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