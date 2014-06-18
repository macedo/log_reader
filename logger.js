var http  = require('http')
  , spawn = require('child_process').spawn;


http.createServer(function(req, res) {
  var childProc = spawn('tail', ['-f', '/home/macedo/Workspace/iaas-api/log/development.log']);
  childProc.stdout.pipe(res);
  res.on('end', function() {
    childProc.kill();
  });
}).listen(1987);
