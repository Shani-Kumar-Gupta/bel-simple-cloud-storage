const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const { PORT_NUMBER } = require('./config/env.config');
const dbConnect = require('./config/db');

// Initializing our application with express
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to Simple Could Storage');
});

// Creating and Running a server
const PORT = PORT_NUMBER || 8080;
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server listening on PORT ${PORT}`);
    dbConnect();
  } else {
    console.log(`Some error encountered to run the server ${err}`);
  }
});
