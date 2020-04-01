const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 8080;

// Require models for syncing.
const db = require('./models');

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setup app to use sessions to keep track of user's login status.
app.use(session({ secret: 'crazy monkey', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.render('index'));

// Sync application to models, then start the Express application.
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
  });
});