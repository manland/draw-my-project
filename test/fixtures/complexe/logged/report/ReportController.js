angular.module('publicApp').controller('ReportController', [
  '$scope', 'DataCacheService', '$http',
  function($scope, dataCacheService, $http) {

    dataCacheService.get('report', {method: 'getNbTaskByProject'})
    .then(
      function(data) {
        initChart(data);
      }, 
      function(error) {
        console.log(error);
      }
    );

    var initChart = function initChart(data) {

      var labels = [];
      var values = [];

      for(var key in data) {
        labels.push(key);
        values.push(data[key]);
      }

      var radarChartData = {
        labels : labels,
        datasets : [
          {
            fillColor : 'rgba(220,220,220,0.5)',
            strokeColor : 'rgba(220,220,220,1)',
            pointColor : 'rgba(220,220,220,1)',
            pointStrokeColor : '#fff',
            data : values
          }
        ]
        
      };

      var myRadar = new Chart(document.getElementById('canvas').getContext('2d'), {
        offset: {
          left: 10,
          top: 0
        }
      }).Radar(radarChartData,{scaleShowLabels : false, pointLabelFontSize : 10});
    };
  }
]);