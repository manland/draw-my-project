var defaultAdvicesOptions = function defaultAdvicesOptions() {
  return {
    controllerImports: {
      enable: true,
      options: {},
      service: require('../advices/ControllerImports')
    },
    fileClassName: {
      enable: true,
      options: {},
      service: require('../advices/FileClassName')
    },
    notUsed: {
      enable: true,
      options: {},
      service: require('../advices/NotUsed')
    },
    rootScope: {
      enable: true,
      options: {},
      service: require('../advices/RootScope')
    },
    sizeControllerTooImportant: {
      enable: true,
      options: {},
      service: require('../advices/SizeControllerTooImportant')
    },
    tooInjectDependencies: {
      enable: true,
      options: {},
      service: require('../advices/TooInjectDependencies')
    },
    filenameEnd: {
      enable: true,
      options: {
        suffix: {
          'service': 'Srv',
          'factory': 'Srv',
          'controller': 'Ctrl'
        }
      },
      service: require('../advices/FilenameEnd')
    }
  };
};

module.exports = {
  defaults: defaultAdvicesOptions(),
  initOptions: function(advices) {
    var _defaultAdvicesOptions = defaultAdvicesOptions();
    if(advices === false) {
      return {};
    } else {
      for(var defaultKey in _defaultAdvicesOptions) {
        if(advices[defaultKey] === undefined) {
          advices[defaultKey] = _defaultAdvicesOptions[defaultKey];
        }
      }
      for(var key in advices) {
        if(advices[key] === false) {
          delete advices[key];
        } else if(advices[key].service === undefined) {
          var options = advices[key];
          advices[key] = _defaultAdvicesOptions[key];
          advices[key].options = options;
        }
      }
      return advices;
    }
  },
  buildAdvices: function(options, nodes) {
    var advicesRes = [];
    var advices = [];

    for(var keyName in options.advices) {
      if(keyName !== false) {
        advices.push(options.advices[keyName].service);
      }
    }

    advices.forEach(function(advice) {
      advice.start(nodes, options);
    });

    advices.forEach(function(advice) {
      nodes.forEach(function(node) {
        advice.visit(node, options);
      });
    });

    advices.forEach(function(advice) {
      advice.end(nodes, options).forEach(function(advice) {
        advicesRes.push(advice);
      });
    });

    advicesRes.sort(function(a1, a2) {
      return a2.gravityLevel - a1.gravityLevel;
    });

    return advicesRes;
  }
}