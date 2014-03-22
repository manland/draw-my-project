var inlineNodeParser = require('../lib/InlineNodeParser');
var parsersHelper = require('../lib/ParsersHelper');

var regexp = // /.*?[^$](controller|factory|service|directive|config|run|filter)\(['|"](.+?)['|"](.+?)function\s?\((.*?)\)/;
    /.*?[^$](controller|factory|service|directive|config|run|filter)\(['|"]([^\)]+?)['|"]([^\)]+?)function\s?\((.*?)\)/;
var regexpCst = /.*?[^$](value|constant|provider)\(['|"](.+?)['|"]\s?/;

var buildNode = function buildNode(name, options, optFilepath, optSize, optImports, optType, optSrc) {
  var type = optType || '';
  if(name.charAt(0) === '$' && type === '') {
    type = 'angular';
  }
  return parsersHelper.buildNode(name, options, optFilepath, optSize, optImports, type, optSrc);
};

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    var nbNodes = nodes.length;
    nodes = inlineNodeParser.parse(regexp, buildNode, nodes, src, filepath, options);
    if(options.nbNodeByFile === -1 || nodes.length <= nbNodes) {
      nodes = inlineNodeParser.parse(regexpCst, buildNode, nodes, src, filepath, options);
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