define('helper/TouchButton', function() {

  var buildBound = function(e) {
    e.preventDefault();
    var touch;
    if(e.changedTouches) {
      for(var i=0, len=e.changedTouches.length; i<len && touch === undefined; i++) {
        if(e.changedTouches[i].target === e.target) {
          touch = e.changedTouches[i];
        }
      }
    }
    var x = touch ? touch.clientX : e.clientX;
    var y = touch ? touch.clientY : e.clientY;
    var l = e.target.offsetLeft;
    var t = e.target.offsetTop;
    return {
      originalEvent: e,
      x: x,
      y: y,
      height: e.target.offsetHeight,
      width: e.target.offsetWidth,
      top: t,
      left: l,
      insideX: x - l,
      insideY: y - t
    };
  };

  return {
    build: function(className, handleStart, handleStop, ctx) {
      var div = document.createElement('div');
      div.classList.add(className);
      if(handleStart) {
        var _handleStart = function(e) {
          if(e.target === div) {
            if(ctx) {
              handleStart.call(ctx, buildBound(e));
            } else {
              handleStart(buildBound(e));
            }
          }
        };
        div.addEventListener('touchstart', _handleStart, false);
        div.addEventListener('touchmove', _handleStart, false);
        div.addEventListener('mousedown', _handleStart, false);
      }
      if(handleStop) {
        var _handleStop = function(e) {
          if(e.target === div) {
            if(ctx) {
              handleStop.call(ctx, buildBound(e));
            } else {
              handleStop(buildBound(e));
            }
          }
        };
        div.addEventListener('touchend', _handleStop, false);
        div.addEventListener('touchcancel', _handleStop, false);
        div.addEventListener('touchleave', _handleStop, false);
        div.addEventListener('mouseup', _handleStop, false);
      }
      return div;
    }
  };

});