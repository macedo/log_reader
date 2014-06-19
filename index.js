var express = require('express')
  , fs      = require('fs')
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

var backlog_size = 2000;
var filename = '/Users/rafaelmacedo/Development/tasklist/log/development.log'

io.sockets.on('connection', function(socket) {
  fs.stat(filename, function(err, stats) {
    if (err) throw err;
    
    var start = (stats.size > backlog_size) ? (stats.size - backlog_size) : 0;
    var stream = fs.createReadStream(filename, { start: start, end: stats.size });
    
    stream.addListener('data', function(lines) {
      lines = lines.toString('utf-8');
      lines = lines.slice(lines.indexOf("\n") + 1).split("\n");
      socket.send({ tail: lines });
    });
  });
  
  fs.watchFile(filename, function(curr, prev) {
    if (prev.size > curr.size) {
      return { clear:true };
    }
    
    var stream = fs.createReadStream(filename, { start: prev.size, end: curr.size });
    stream.addListener('data', function(lines) {
      socket.broadcast.emit('message', { tail: lines.toString('utf-8').split("\n") });
    });
  });
});