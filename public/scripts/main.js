require.config({
  paths: {
   jquery: 'lib/jquery',
   socketio: '../socket.io/socket.io'
  }
});


require(
  [
    'control',
    'log_view'
  ],

  function(Control, LogView) {
    Control.init();
    LogView.init();
  }
);
