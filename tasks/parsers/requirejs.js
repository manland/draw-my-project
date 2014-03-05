var inlineNodeParser = require('../lib/InlineNodeParser');
var parsersHelper = require('../lib/ParsersHelper');

var regexp = /(define)\(['|"](.+?)['|"](.+?)function\s?\((.*?)\)/;

module.exports = {
  foundNode: function(nodes, src, filepath, options) {
    return inlineNodeParser.parse(regexp, parsersHelper.buildNode, nodes, src, filepath, options);
  },
  callbackAfter: function(nodes, options) {
    return nodes;
  }
}