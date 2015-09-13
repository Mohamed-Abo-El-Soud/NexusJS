// app/views/index.js

var path = require("path");
var favicon = require('serve-favicon');
var expressLayouts = require('express-ejs-layouts');
var express = require('express');
// importer stuff
var importer = require("../../importer");


module.exports = function (app, dirname){
    
    // view engine setup
    app.set('views', path.join(dirname, 'app/views'));
    // set the app view engine to ejs
    app.set('view engine', 'ejs');
    
    // allow for layouts
    app.use(expressLayouts);
    
    // importer stuff cont.
    app.use(importer);
    
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    // import all resources
    app.use(express.static(path.join(dirname, 'public')));
    
};