angular.module('app').service('OnOffSwitchService', [
  function() {

    var callbacks = [];
    var isOn = true;

    return {
      onSwitch: function(callback) {
        callbacks.push(callback);
      },
      switchTo: function() {
        isOn = !isOn;
        _.each(callbacks, function(callback) {
          callback(isOn);
        });
      }
    };

  }
]);