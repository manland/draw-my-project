var parsersHelper = require('../lib/parsersHelper');

var regexClassName = /.*?[^$](controller|provider|factory|service|value|constant|directive|config|run|filter)\(['|"](.+?)['|"]/,
  regexImports = /function/;

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    return parsersHelper.foundNode(regexClassName, regexImports, nodes, src, filepath, options);
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