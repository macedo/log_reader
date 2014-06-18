(function($, document, window, undefined) {
  var websocket = io();

  websocket.on('data', function(data) {
    $("pre").append(String.fromCharCode.apply(null, new Uint8Array(data)));
  });
})($, document, window);
