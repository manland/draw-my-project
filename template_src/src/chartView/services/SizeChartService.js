angular.module('app').service('SizeChartService', [
  'ConstantsService',
  function(constantsService) {

    var mouseovered = function mouseovered(d) {
      console.log(d);
    };

    var mouseouted = function mouseouted(d) {
    };

    return {
      buildChart: function(domElement, data) {
        var width = 700,
            height = 800,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.size; });

        var svg = d3.select(domElement).append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var draw = function draw(data) {

          data.forEach(function(d) {
            d.size = +d.size;
          });

          var g = svg.selectAll(".arc")
              .data(pie(data))
            .enter().append("g")
              .attr("class", "arc");

          g.append("path")
            .attr("d", arc)
            .attr("class", "link")
            .on("mouseover", mouseovered)
            .on("mouseout", mouseouted);

          g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .attr("class", function(d) { return "node " + d.data.type; })
            .text(function(d) { 
              var i = d.data.name.lastIndexOf(constantsService.getPathSeparator()); 
              return d.data.name.substring(i + 1); 
            });

        };

        draw(data);
      },
      mouseOver: function(nodeName) {
      },
      mouseOut: function(nodeName) {
      }
    };

  }
]);