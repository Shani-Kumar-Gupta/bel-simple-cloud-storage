const express = require('express');
const helmet = require('helmet');
const routes = express.Router();
const { PORT_NUMBER } = require('./config/env.config');
const dbConnect = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const httpStatus = require('http-status');
const { userAuthRoutes, bucketRoutes, uploadRoutes } = require('./routers');

// Initializing our application with express
const app = express();

/************************ Middlewares Start *****************************/
// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true}));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());
app.use(routes);

/************************ Middlewares Ends *****************************/

/************************ Routes Start *****************************/
// Routes
routes.get('/', (req, res, next) => {
  res.status(200).send('Welcome to Simple Could Storage');
});

/* Auth Routes */
routes.use('/simple-cloud-storage/v1/userAuth', userAuthRoutes);

/* Bucket Routes */
routes.use('/simple-cloud-storage/v1/bucket', bucketRoutes);

/* upload Routes */
routes.use('/simple-cloud-storage/v1/upload', uploadRoutes);

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
