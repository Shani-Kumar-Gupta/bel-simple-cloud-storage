const express = require('express');
const helmet = require('helmet');
const routes = express.Router();
const bodyParser = require('body-parser');
const { PORT_NUMBER } = require('./config/env.config');
const dbConnect = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const httpStatus = require('http-status');

// Initializing our application with express
const app = express();

/************************ Middlewares Start *****************************/
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(bodyParser.json());
// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

/************************ Middlewares Ends *****************************/

/************************ Routes Start *****************************/
// Routes
app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to Simple Could Storage');
});

// send back 404 response if endpoint not found
// app.use((req, res, next) => {
  
// });

/************************ Routes End *****************************/

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
