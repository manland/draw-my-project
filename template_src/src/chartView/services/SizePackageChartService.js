angular.module('app').service('SizePackageChartService', [
  'ConstantsService',
  function(constantsService) {

    var mouseovered = function mouseovered(d) {
    };

    var mouseouted = function mouseouted(d) {
    };

    return {
      buildChart: function(domElement, data) {
        var diameter = 700,
          format = d3.format(",d");

        var pack = d3.layout.pack()
          .size([diameter - 4, diameter - 4])
          .value(function(d) { return d.size; });

        var svg = d3.select(domElement).append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
          .append("g")
            .attr("transform", "translate(2,2)");

        var draw = function draw(root) {
          var node = svg.datum(root).selectAll(".node")
              .data(pack.nodes)
            .enter().append("g")
              .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          node.append("title")
            .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

          node.append("circle")
            .attr("class", "link")
            .attr("r", function(d) { return d.r; });

          node.filter(function(d) { return !d.children; }).append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .attr("class", function(d) { return "node " + d.type; })
            .text(function(d) { return d.name.substring(0, d.r / 3); });
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