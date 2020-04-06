const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    host: 'localhost',
    port: 8080,
    user: 'root',
    password: '',
    database: 'novel19_db'
  });
}

connection.connect();
module.exports = connection;
