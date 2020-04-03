const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function (app) {
  // Home page
  app.get('/home', (req, res) => {
    console.log('/HOME');
    // User is signed in.
    if (req.user) {
      const data = {
        username: req.user.username,
        yearBorn: req.user.yearBorn,
        status: (req.user.status === '1'),
        home: true
      };
      console.log('IN IF, RES.RENDER INDEX: ', data);
      res.render('index', { user: data });
    }
    else {
      console.log('IN ELSE, RES.RENDER INDEX: ');
      // User not signed in.
      res.status(206).render('index', { home: true});
    }
  });

  // Member page
  app.get('/profile', isAuthenticated, (req, res) => {
    console.log('/PROFILE');
    const data = {
      username: req.user.username,
      yearBorn: req.user.yearBorn,
      status: (req.user.status === '1'),
      profile: true
    };
    console.log('RES.RENDER PROFILE: ', data);
    res.render('profile', { user: data});
  });


  // Stats page
  app.get('/stats', (req, res) => {
    console.log('RES.RENDER STATS');
    res.render('stats', { stats: true });
  });

  // Home page redirect
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

};