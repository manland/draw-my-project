define('helper/KeyboardHelper', function() {

  var handlers = {};

  document.onkeydown = function(evt) {
    //console.log('down', evt.keyCode);
    if(handlers[evt.keyCode]) {
      handlers[evt.keyCode].start.call(handlers[evt.keyCode].ctx);
    }
    // evt.keyCode === 32 : SPACE
  };

  document.onkeyup = function(evt) {
    //console.log('up', evt.keyCode);
    if(handlers[evt.keyCode]) {
      handlers[evt.keyCode].stop.call(handlers[evt.keyCode].ctx);
    }
  };

  return {
    listen: function(touch, startCallback, stopCallback, ctx) {
      handlers[touch] = {start: startCallback, stop: stopCallback, ctx: ctx};
    }
  };

});