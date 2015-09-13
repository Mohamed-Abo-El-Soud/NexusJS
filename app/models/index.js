// app/models/index.js


module.exports = function(app) {
    var uri = 'mongodb://localhost/todos';
    var db = require('mongoose').connect(uri);
};