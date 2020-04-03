const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {
  // Home page
  app.get('/home', (req, res) => {
    // User is signed in.
    if (req.user) {
      const data = {
        username: req.user.username,
        yearBorn: req.user.yearBorn,
        status: (req.user.status === '1'),
        home: true
      };
      res.render('index', { user: data });
    }
    else {
      // User not signed in.
      res.status(206).render('index', { home: true});
    }
  });

  // Member page
  app.get('/profile', isAuthenticated, (req, res) => {
    const data = {
      username: req.user.username,
      yearBorn: req.user.yearBorn,
      status: (req.user.status === '1'),
      profile: true
    };
    res.render('profile', { user: data});
  });


  // Stats page
  app.get('/stats', (req, res) => {
    res.render('stats', { stats: true });
  });

  // Home page redirect
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

};