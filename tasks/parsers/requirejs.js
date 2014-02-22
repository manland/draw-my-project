var parsersHelper = require('../lib/parsersHelper');

var regexClassName = /(define)\(['|"](.+?)['|"]/,
  regexImports = /function/;

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    return parsersHelper.foundNode(regexClassName, regexImports, nodes, src, filepath, options);
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}