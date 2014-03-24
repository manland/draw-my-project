var _ = require('underscore');

var inlineNodeParser = require('../lib/InlineNodeParser');
var parsersHelper = require('../lib/ParsersHelper');

var regexp = /\.(controller|factory|service|directive|config|run|filter)\(['|"]([^\)]+?)['|"]([^\)]+?)function\s?\((.*?)\)/;
var regexpCst = /\.(value|constant|provider)\(['|"](.+?)['|"]\s?/;

var regexpClassInject = /\.(controller|factory|service|directive|config|run|filter)\(\s?['|"]([^'"]+)['|"]\s?,?\s?([^\)]+)\)/;
var regexpInject = /\.\$inject\s?=\s?\[([^\]]*)\]/;

var buildNode = function buildNode(name, options, optFilepath, optSize, optImports, optType, optSrc) {
  var type = optType || '';
  if(name.charAt(0) === '$' && type === '') {
    type = 'angular';
  }
  return parsersHelper.buildNode(name, options, optFilepath, optSize, optImports, type, optSrc);
};

var checkInject = function checkInject(buildNodeFunc, nodes, src, filepath, options) {
  var temp = src.split('\n').join(' ');
  var matches = temp.match(regexpClassInject);
  var count = 0;
  while(matches !== null) {
    var nodeType = matches[1];
    var name = matches[2];

    var imports = temp.match(regexpInject);
    if(imports !== null) {
      imports = imports[1].replace(/(\[|\]|\s|'|")/g, '').split(',');
      imports = _.filter(imports, function(imp) {
        return imp !== '';
      });
      _.each(imports, function(imp) {
        if(nodes[imp] === undefined) {
          nodes[imp] = buildNodeFunc(imp, options);
        }
      });
    } else {
      imports = [];
    }

    if(nodes[name] === undefined) {
      nodes[name] = buildNodeFunc(name, options, filepath, src.length, imports, nodeType, src);
    } else {
      nodes[name] = parsersHelper.updateNode(nodes[name], options, filepath, src.length, imports, nodeType, src);      
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
    var nbNodes = nodes.length;
    nodes = inlineNodeParser.parse(regexp, buildNode, nodes, src, filepath, options);
    if(options.nbNodeByFile === -1 || nodes.length <= nbNodes) {
      nodes = inlineNodeParser.parse(regexpCst, buildNode, nodes, src, filepath, options);
    }
    if(options.checkAngularjsInject === true) {
      nodes = checkInject(buildNode, nodes, src, filepath, options);
    }
    return nodes;
  },
  callbackAfter: function(nodes, options) {
    //add internal to all no typed node
    for(key in nodes) {
      if(nodes[key].type === '') {
        nodes[key].type = 'internal';
      }
    }
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