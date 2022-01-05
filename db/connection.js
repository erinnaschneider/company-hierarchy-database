const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  // Your MySQL username,
  user: 'root',
  // Your MySQL password
  password: 'gajt666blko',
  database: 'company-hierarchy-database'
});

module.exports = db;
