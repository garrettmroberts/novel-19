const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

// Require models for syncing.
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes
require('./controllers/htmlroutes.js')(app);
require('./controllers/apiroutes.js')(app);

// Sync application to models, then start the Express application.
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
  });
});