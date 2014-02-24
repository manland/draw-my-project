angular.module('app').service('ChartMouseService', [
  function() {

    var selectedNodes = [];

    return {
      getKeepNodes: function() {
        return selectedNodes;
      },
      mouseClick: function(nodeName) {
        var temp = _.reject(selectedNodes, function(n) {
          return n === nodeName;
        });
        if(temp.length === selectedNodes.length) {
          selectedNodes.push(nodeName);
        } else {
          selectedNodes = temp;
        }
      }
    };

  }
]);
