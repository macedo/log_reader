define(
  [
    'jquery',
  ],

  function($) {
    var Control = (function() {
      function init() {
        bindEvents();
      }
      
      function bindEvents() {
        $("#turn-off").on("click", function(event) {
          $(".ls-main").toggleClass("off");
        });
      }

      return {
        init: init
      };
    })();

    return {
      init: Control.init
    }
  }
);