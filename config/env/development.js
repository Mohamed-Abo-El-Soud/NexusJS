
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


var port = normalizePort(process.env.PORT || '3000');

module.exports = {
    port: port,
    db: 'mongodb://'+process.env.IP+'/nexus'
};