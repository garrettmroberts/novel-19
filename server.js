const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

// Require models for syncing.
var db = require('./models');


// Sync application to models, then start the Express application.
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
  });
});