const path = require('path');

module.exports = function (app) {
  app.get('/', (req, res) => res.render('index'));
  app.get('/stats', (req, res) => res.render('stats'));
};