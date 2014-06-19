var express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
  , io      = require('socket.io')(server)
  , port    = process.env.PORT || 5000
  , spawn   = require('child_process').spawn;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  var childProc = spawn('tail', ['-f', '/Users/rafaelmacedo/Development/tasklist/log/development.log']);
  childProc.stdout.on('data', function(data) {
    socket.emit("data", data);
  });
});