const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');
// const fetch = require('node-fetch');

// import direct controllers
const sessionController = require('./controllers/sessionController');
// const cookieController = require('./controllers/cookieController');

// import routes
const signupRouter = require('./routes/signupRoute');
const signinRouter = require('./routes/signinRoute');
const signoutRouter = require('./routes/signoutRoute');
const isLoggedInRouter = require('./routes/isLoggedInRoute');
const propertiesRouter = require('./routes/propertiesRoute');
const addFavsRouter = require('./routes/addFavsRoute');
const getFavsRouter = require('./routes/getFavsRoute');

//db connection
mongoose
  .connect(process.env.DATABASE)
  .then(res => console.log('Connected to DB'))
  .catch(err => console.log('Mongo DB Connection Error:', err));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// signup route
app.use('/register', signupRouter);

// signin route
app.use('/signin', signinRouter);

// signout route
app.use('/signout', signoutRouter);

// signin route
app.use('/isLoggedIn', isLoggedInRouter);

// properties route
app.use('/properties', propertiesRouter);

// add favorites route
app.use('/addFav', addFavsRouter);

// get favorites route
app.use('/getFavs', getFavsRouter);

app.use('/dist', express.static(path.join(__dirname, '../dist')));

//serve index.html - NOTE - THIS ROUTE NEVER ACTUALLY HITS (react router serves up the page??)
app.get('/',
  (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  }
);

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: { err: 'An unknown error occurred.' }
  };
  Object.assign(defaultErr, err);
  console.log(defaultErr.log);
  return res.status(defaultErr.status).json(defaultErr.message);
});

//listen on 3000
app.listen(3000, () => {
  console.log('Server listening on 3000');
});
