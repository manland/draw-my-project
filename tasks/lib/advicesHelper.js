var defaultAdvicesOptions = {
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
  }
};

module.exports = {
  defaults: defaultAdvicesOptions,
  initOptions: function(advices) {
    if(advices === false) {
      return {};
    } else {
      for(var defaultKey in defaultAdvicesOptions) {
        if(advices[defaultKey] === undefined) {
          advices[defaultKey] = defaultAdvicesOptions[defaultKey];
        }
      }
      for(var key in advices) {
        if(advices[key] === false) {
          delete advices[key];
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