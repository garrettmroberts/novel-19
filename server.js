const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

// Require models for syncing.
var db = require('./models');

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index'));

// Sync application to models, then start the Express application.
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
  });
});