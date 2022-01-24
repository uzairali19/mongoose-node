const express = require('express');
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const usersRouter = require('./routes/userRouter');

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/example';
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log('Connected correctly to server');
  },
  (err) => {
    console.log(err);
  }
);

// app.use(cookieParser('12345-67890-09876-54321'));
app.use(
  session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(express.static(__dirname + '/public'));
app.use('/users', usersRouter);

function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  } else {
    if (req.session.user === 'authenticated') {
      next();
    } else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/html');
  res.end('<html><body><h1>Hello World</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
