require.config({
  paths: {
   jquery: 'lib/jquery',
   socketio: '../socket.io/socket.io'
  }
});


require(
  [
    'log_view'
  ],

  function(LogView) {
    LogView.init();
  }
);
