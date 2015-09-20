var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// logging to browser console

// set the environment - NOTE: Must be before the models module
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// models module - must 
// var models = require("./app/models");
// router stuff
var routes = require('./app/routes');
// views module
var views = require("./app/views");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// set all view configurations with one call
views(app,__dirname);
// We set all the routes with one single call
routes(app);
// set up the models stuff
// models(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404 has been reached!");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("500 has been reached!");
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log("production 500 has been reached!");
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
