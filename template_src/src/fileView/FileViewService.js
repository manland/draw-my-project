angular.module('app').service('FileViewService', [
  'ConstantsService', 'ChartMouseService',
  function(constantsService, chartMouseService) {

    var callbacks = {
      selectNode: []
    };

    if(constantsService.source() !== false) {
      chartMouseService.on('selectedNodes', function(node, isSelect) {
        _.each(callbacks.selectNode, function(callback) {
          callback(node, isSelect);
        });
      });
    }

    return {

      on: function(key, callback) {
        if(callbacks[key] !== undefined) {
          callbacks[key].push(callback);
        } else {
          throw 'FileViewService doesn\'t have '+key+' callback !';
        }
      }

    };

  }
]);