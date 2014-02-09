define('util/TimeUtil', 
  ['helper/DomHelper', 'helper/EntityHelper', 'manager/EntityManager'],
  function(DomHelper, EntityHelper, EntityManager) {

	'use strict';

  var div = DomHelper.buildDiv('time');
  var time, intervalTime, onEnd, isAdded = false;

  var start = function start() {
    intervalTime = setInterval(function() {
      time = time - 1;
      div.innerHTML = time;
      if(time < 0) {
        clearInterval(intervalTime);
        onEnd();
      }
    }, 1000);
  };

  return {

    start: function(seconds, onEndCallback) {
      document.body.appendChild(div);
      onEnd = onEndCallback;
      time = seconds;
      isAdded = true;
      start();
    },
    hide: function() {
      if(isAdded) {
        isAdded = false;
        document.body.removeChild(div);
        clearInterval(intervalTime);
      }
    },
    pause: function() {
      clearInterval(intervalTime);
    },
    resume: function() {
      if(isAdded && time !== undefined) {
        start();
      }
    }

  };

});