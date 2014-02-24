angular.module('app').service('ScreenSizeService', [
  '$window',
  function($window) {

    var onResizeCallbacks = [];

    var screenWidth = $window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    var screenHeight = $window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;

    var update = function update() {
      screenWidth = $window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
      screenHeight = $window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
      for(var i=0, len=onResizeCallbacks.length; i<len; i++) {
        onResizeCallbacks[i](screenWidth, screenHeight);
      }
    };

    $window.addEventListener('resize', update, false);

    return {
      getWidth: function() {
        return screenWidth;
      },
      getHeight: function() {
        return screenHeight;
      },
      getDiameterChart: function() {
        return Math.min(screenWidth, screenHeight-45);
      },
      onResize: function(callback) {
        onResizeCallbacks.push(callback);
      }
    };

  }
]);