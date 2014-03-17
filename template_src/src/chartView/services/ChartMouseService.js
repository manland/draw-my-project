angular.module('app').service('ChartMouseService', [
  function() {

    var selectedNodes = [];

    var callbacks = {
      selectedNodes: []
    };

    return {
      on: function(key, callback) {
        if(callbacks[key] !== undefined) {
          callbacks[key].push(callback);
        } else {
          throw 'ChartMouseService doesn\'t have '+key+' callback !';
        }
      },
      getKeepNodes: function() {
        return selectedNodes;
      },
      mouseClick: function(node) {
        var isSelect = false;
        var temp = _.reject(selectedNodes, function(n) {
          return n === node.name;
        });
        if(temp.length === selectedNodes.length) {
          selectedNodes.push(node.name);
          isSelect = true;
        } else {
          selectedNodes = temp;
        }
        _.each(callbacks.selectedNodes, function(callback) {
          callback(node, isSelect);
        });
      }
    };

  }
]);
