define('util/OptionsUtil',
  ['helper/MobileHelper'],
  function(MobileHelper) {

	'use strict';

  var defaultOptions = {
    screenSize: 0.3,
    meshDetails: 1
  };

  if(MobileHelper.isMobile()) {
    defaultOptions.screenSize = 1;
  }

  var options = defaultOptions;
  if(localStorage.options) {
    try {
      options = JSON.parse(localStorage.options);
    } catch(e) {}
  }

  return {

    get: function(key) {
      return options[key];
    },
    update: function(key, value) {
      options[key] = value;
      localStorage.options = JSON.stringify(options);
    }

  };

});