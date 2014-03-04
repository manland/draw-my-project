var _ = require('underscore');
var parsersHelper = require('../lib/parsersHelper');

var regexp = /.*?[^$](controller|provider|factory|service|value|constant|directive|config|run|filter)\(['|"](.+?)['|"](.+?)function\((.*?)\)/;

var foundNode = function foundNode(nodes, src, filepath, options) {
  var temp = src.split('\n').join(' ');
  var matches = temp.match(regexp);
  var count = 0;
  while(matches !== null) {
    var nodeType = matches[1];
    var name = matches[2];
    var importsString = matches[3].replace(/(\[|\s|'|")/g, '').split(',');
    var importsFunc = matches[4].replace(/\s/g, '').split(',');

    var imports = importsString.length >= importsFunc.length ? importsString : importsFunc;
    imports = _.filter(imports, function(imp) {
      return imp !== '';
    });
    _.each(imports, function(imp) {
      if(nodes[imp] === undefined) {
        nodes[imp] = parsersHelper.buildNode(imp);
      }
    });

    if(nodes[name] === undefined) {
      nodes[name] = parsersHelper.buildNode(name, filepath, src.length, imports, nodeType);
    } else {
      nodes[name].filepath = filepath;
      nodes[name].size = src.length;
      nodes[name].imports = imports;
      nodes[name].type = nodeType;
    }

    count = count + 1;
    if(options.nbNodeByFile === -1 || count < options.nbNodeByFile) {
      temp = temp.substr(matches.index + matches[0].length);
      matches = temp.match(regexp);
    } else {
      matches = null;
    }
  }

  return nodes;
};

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    return foundNode(nodes, src, filepath, options);
  },
  callbackAfter: function(nodes, options) {
    if(options.sortByAngularType === true) {
      var key;
      //first add path to imports
      for(key in nodes) {
        for(var i=0, len=nodes[key].imports.length; i<len; i++) {
          var importName = nodes[key].imports[i];
          nodes[key].imports[i] = nodes[importName].type + options.pathSeparator + nodes[importName].name;
        }
      }
      //second add path to node
      for(key in nodes) {
        nodes[key].name = nodes[key].type + options.pathSeparator + nodes[key].name;
      }
    }
    return nodes;
  }
}