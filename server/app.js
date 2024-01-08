const express = require('express');

const studentRouter = require('./routes/studentRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use('/api/v1/students', studentRouter);

module.exports = app;
