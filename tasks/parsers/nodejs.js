var parsersHelper = require('../lib/parsersHelper');

var regexClassName = /(require)\(['|"](.+)['|"]\)/,
  regexImports = /module.exports\s*=\s*[new]*([^\(]+)/;

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    return parsersHelper.foundNode(regexClassName, regexImports, nodes, src, filepath, options);
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}