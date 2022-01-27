const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate');
const config = require('./config');
const hostname = '127.0.0.1';
const port = 3000;
const bodyParser = require('body-parser');

const app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(
      307,
      'https://' + req.hostname + ':' + app.get('secPort') + req.url
    );
  }
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const usersRouter = require('./routes/userRouter');
const uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect('mongodb://127.0.0.1/example');

connect.then(
  (db) => {
    console.log('Connected correctly to server', db.connections);
  },
  (err) => {
    console.log(err);
  }
);

app.use(passport.initialize());

app.use(express.static(__dirname + '/public'));
app.use('/users', usersRouter);

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.end('<html><body><h1>Hello World</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});

module.exports = app;
