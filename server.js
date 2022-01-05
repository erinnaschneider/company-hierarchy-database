require('dotenv').config();
const db = require('./db/connection');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 3001;

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });