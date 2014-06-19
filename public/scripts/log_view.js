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
          .on('message', function(message) {
             $("pre").append(message.tail.join('<br/>'));
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
