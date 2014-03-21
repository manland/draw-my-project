angular.module('app').service('SizePackageChartService', [
  'ConstantsService', 'ScreenSizeService', 'ChartMouseService',
  function(constantsService, screenSizeService, chartMouseService) {

    var svg, node;

    var mouseovered = function mouseovered(d) {
      svg.selectAll(".node")
        .classed("hover", function(n) { 
          return d !== undefined && 
            (n.name === d.name ||
              _.contains(chartMouseService.getKeepNodes(), n.name)); 
        });
    };

    var mouseouted = function mouseouted() {
      svg.selectAll(".node")
        .classed("hover", function(d) {
          return _.contains(chartMouseService.getKeepNodes(), d.name); 
        });
    };

    var mouseclick = function mouseclick(d) {
      chartMouseService.mouseClick(d);
    };

    return {
      buildChart: function(domElement, data) {
        var diameter = screenSizeService.getDiameterChart(),
          format = d3.format(",d");

        var pack = d3.layout.pack()
          .size([diameter - 4, diameter - 4])
          .value(function(d) { return d.size; });

        var zoom = function zoom() {
          svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        };

        svg = d3.select(domElement)
          .append("svg")
            .attr("width", screenSizeService.getWidth())
            .attr("height", screenSizeService.getHeightChart())
            .attr("viewBox", "0 0 "+diameter+" "+diameter)
            .call(d3.behavior.zoom()
              .scaleExtent([0.1, 15])
              .on("zoom", zoom))
          .append("g")
            .attr("transform", "translate(2, 2)");

        var draw = function draw(root) {
          node = svg.datum(root).selectAll(".node")
              .data(pack.nodes)
            .enter().append("g")
              .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
              .on("mouseover", mouseovered)
              .on("mouseout", mouseouted)
              .on("click", mouseclick)
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
        if(nodeName !== undefined) {
          var names = nodeName.split(constantsService.getPathSeparator());
          mouseovered({name: names[names.length-1]});
        }
      },
      mouseOut: function(nodeName) {
        mouseouted();
      }
    };

  }
]);