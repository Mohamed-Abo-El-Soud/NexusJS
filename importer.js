var express = require('express');
var path = require('path');
var sass = require('node-sass');
var fs = require('fs');

var app = express();

app.use(function (req, res, next) {
//   console.log("this is sparta!!");
  var rendered_object = sass.renderSync({
    file: path.join(__dirname, 'public/sass/style.scss'),
    outputStyle: 'nested'
  }, function(error, result) { 
    // console.log(result);
    if (error) {
      console.log("Error: Sass file not found or successfully compiled!");
      console.log(error.status); // used to be "code" in v2x and below
      console.log(error.column);
      console.log(error.message);
      console.log(error.line);
    } else if (result){
      console.log("success!");
    }
  });
  fs.writeFileSync(path.join(__dirname, 'public/stylesheets/style.css'), rendered_object.css);
  next();
});

module.exports = app;