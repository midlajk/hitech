require('./model/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
// view engine setu
const MongoDBStore = require('connect-mongodb-session')(session);// Import connect-mongo to use it as a session store

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminpostapis = require('./routes/adminpostapis');
var adminapis = require('./routes/adminapis');
var getapis = require('./routes/getapis');
var getdetails = require('./routes/getdetailedview');
var deleteapis = require('./routes/deleteapis');
var getsumapis = require('./routes/getsumapi');
var editapis = require('./routes/editapis');


// Define the public directory

var cors = require('cors')


var app = express();
app.use(express.static(path.join(__dirname, 'public')));///front end //
app.use(express.static('public'));
 
const url = `mongodb://127.0.0.1:27017/hitech`;

const store = new MongoDBStore({
  uri: url,
  collection: 'sessions',
  

});
// Configure session and session store with connect-mongo
app.use(
  session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store,
  

  })
);
// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
;


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', adminpostapis);
app.use('/', adminapis);
app.use('/', getapis);
app.use('/',getdetails)
app.use('/',deleteapis)
app.use('/',getsumapis)
app.use('/',editapis)
/////Front end routes ///


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // set locals, only providing error in development  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error:',err)
  res.render('errorpage', { error: err });
});

module.exports = app;
