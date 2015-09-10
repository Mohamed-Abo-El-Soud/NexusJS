// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(process.env.PORT, process.env.IP);




// var morgan = require('morgan');
// var express = require('express'),
//     app = express();

// app.use(morgan('combined'));

// app.get('/', function(req, res){
//     res.send('Hello World');
// });

// app.listen(process.env.PORT);
// console.log('Express server started on port %s', process.env.PORT);


var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// var server = app.listen(process.env.PORT, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);