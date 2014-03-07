var defaultAdvicesOptions = function defaultAdvicesOptions() {
  return {
    controllerImports: {
      enable: true,
      options: {
        gravityLevel: 1
      },
      service: require('../advices/ControllerImports')
    },
    fileClassName: {
      enable: true,
      options: {
        gravityLevel: 2
      },
      service: require('../advices/FileClassName')
    },
    notUsed: {
      enable: true,
      options: {
        gravityLevel: 2,
        desableNodeType: []
      },
      service: require('../advices/NotUsed')
    },
    rootScope: {
      enable: true,
      options: {
        gravityLevel: 2
      },
      service: require('../advices/RootScope')
    },
    sizeControllerTooImportant: {
      enable: true,
      options: {
        gravityLevel: 2,
        sizeMaxCtrlComparedToService: 0.2
      },
      service: require('../advices/SizeControllerTooImportant')
    },
    tooInjectDependencies: {
      enable: true,
      options: {
        gravityLevel: 1,
        nbMax: 5
      },
      service: require('../advices/TooInjectDependencies')
    },
    filenameChecker: {
      enable: true,
      options: {
        gravityLevel: 2,
        prefix: {},
        suffix: {
          'service': 'Srv',
          'factory': 'Srv',
          'controller': 'Ctrl'
        }
      },
      service: require('../advices/FilenameChecker')
    }
  };
};

var gravityNameByLevel = function gravityNameByLevel(gravityLevel) {
  return gravityLevel === 2 ? 'hot' : gravityLevel === 1 ? 'significant' : 'notserious';
};

module.exports = {
  defaults: defaultAdvicesOptions,
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
          options.gravityLevel = options.gravityLevel || _defaultAdvicesOptions[key].options.gravityLevel;
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
      advices.push(options.advices[keyName]);
    }

    advices.forEach(function(advice) {
      advice.service.start(nodes, options);
    });

    advices.forEach(function(advice) {
      nodes.forEach(function(node) {
        advice.service.visit(node, options);
      });
    });

    advices.forEach(function(advice) {
      advice.service.end(nodes, options).forEach(function(a) {
        a.gravityLevel = a.gravityLevel || advice.options.gravityLevel;
        a.gravity = gravityNameByLevel(a.gravityLevel);
        advicesRes.push(a);
      });
    });

    advicesRes.sort(function(a1, a2) {
      return a2.gravityLevel - a1.gravityLevel;
    });

    return advicesRes;
  }
}