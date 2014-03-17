angular.module('app').directive('hljs', [
  '$http', 'FileViewService', 'ConstantsService',
  function($http, fileViewService, constantsService) {

    var _cache = {};

    var process = function process(element, data) {
      element[0].innerHTML = data;
      hljs.highlightBlock(element[0]);
    };

    return function (scope, element) {
      element[0].style.background = 'none';
      if(constantsService.source() !== false) {
        fileViewService.on('selectNode', function(node, isSelect) {
          console.log(isSelect);
          if(isSelect === true) {
            if(node.src !== undefined && node.src !== '') {
              if(constantsService.srcInCode() === true) {
                process(element, node.src);
              } else {
                if(_cache[node.src] === undefined) {
                  $http.get(node.src).success(function(data) {
                    _cache[node.src] = data;
                    process(element, data);
                  }).error(function() {
                    console.error('src not downloaded !');
                  });
                } else {
                  process(element, _cache[node.src]);
                }
              }
            }
          } else {
            element[0].innerHTML = '';
          }
        });
      }
    };

  }
]);