define(
  [
    'jquery',
    'socketio',
  ],

  function($, io) {
    var LogView = (function() {

      var websocket = io();

      function init() {
        websocket
          .on('data', function(data) {
            $('pre').append(String.fromCharCode.apply(null, new Uint8Array(data)));
          });
      }

      return {
        init: init
      };
    })();

    return {
      init: LogView.init
    }
  }
);
