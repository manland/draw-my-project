angular.module('app').service('SizeChartService', [
  'ConstantsService', 'ScreenSizeService',
  function(constantsService, screenSizeService) {

    var totalSize = 0, vis, nodes;

    var getAncestors = function getAncestors(node) {
      var path = [];
      var current = node;
      while (current.parent) {
        path.unshift(current);
        current = current.parent;
      }
      return path;
    };

    var findNode = function findNode(nodeName, nodes) {
      if(nodeName !== undefined) {
        return _.find(nodes, function(n) {
          var name = nodeName.split(constantsService.getPathSeparator());
          name = name[name.length-1];
          if(n.name === name) {
            return n;
          }
        });
      }
    };

    var mouseovered = function mouseovered(d) {
      var percentage = (100 * d.value / totalSize).toPrecision(3);
      var percentageString = percentage + '%';
      if (percentage < 0.1) {
        percentageString = '< 0.1%';
      }

      var sequenceArray = getAncestors(d);

      var name = sequenceArray.map(function(node) {
        return node.name;
      }).join('/');
      
      d3.select('#percentage').text(name + ' ' + percentageString);

      // Fade all the segments.
      d3.selectAll('path').style('opacity', 0.3);

      // Then highlight only those that are an ancestor of the current segment.
      vis.selectAll('path').filter(function(node) {
        return (sequenceArray.indexOf(node) >= 0);
      }).style('opacity', 1);
    };

    var mouseouted = function mouseouted(d) {
      // Hide the breadcrumb trail
      d3.select('#trail').style('visibility', 'hidden');

      // Transition each segment to full opacity and then reactivate it.
      d3.selectAll('path')
        .style('opacity', 1);

      d3.select('#percentage').text('');
    };

    return {
      buildChart: function(domElement, data) {
        // Dimensions of sunburst.
        var width = screenSizeService.getDiameterChart();
        var height = screenSizeService.getDiameterChart();
        var radius = (screenSizeService.getDiameterChart() / 2) - 25;

        var zoom = function zoom() {
          vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        };

        vis = d3.select(domElement)
          .append("svg")
            .attr("width", screenSizeService.getWidth())
            .attr("height", screenSizeService.getHeightChart())
            .attr("viewBox", "0 0 "+width+" "+height)
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .call(d3.behavior.zoom().scaleExtent([-1, 16]).on("zoom", zoom))
          .append("g");

        var partition = d3.layout.partition()
            .size([2 * Math.PI, radius * radius])
            .value(function(d) { return d.size; });

        var arc = d3.svg.arc()
            .startAngle(function(d) { return d.x; })
            .endAngle(function(d) { return d.x + d.dx; })
            .innerRadius(function(d) { return Math.sqrt(d.y); })
            .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

        // Main function to draw and set up the visualization, once we have the data.
        var draw = function draw(json) {

          // Bounding circle underneath the sunburst, to make it easier to detect
          // when the mouse leaves the parent g.
          vis.append("circle")
              .attr("r", radius)
              .style("opacity", 0);

          // For efficiency, filter nodes to keep only those large enough to see.
          nodes = partition.nodes(json)
            .filter(function(d) {
              return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
            });

          var path = vis.data([json]).selectAll("path")
            .data(nodes)
            .enter().append("svg:path")
            .attr("display", function(d) { return d.depth ? null : "none"; })
            .attr("d", arc)
            .attr("fill-rule", "evenodd")
            .style("opacity", 1)
            .attr("class", function(d) { return "node " + d.type; })
            .on("mouseover", mouseovered);

          // Add the mouseleave handler to the bounding circle.
          d3.select("#container").on("mouseleave", mouseouted);

          // Get total size of the tree = value of root node from partition.
          totalSize = path.node().__data__.value;

          d3.select(domElement).append("div")
            .attr('id', 'percentage')
            .attr('style', 'top:'+(height/2)+'px');
        };

        draw(data);
      },
      mouseOver: function(nodeName) {
        var n = findNode(nodeName, nodes);
        if(n !== undefined) {
          mouseovered(n);
        }
      },
      mouseOut: function(nodeName) {
        mouseouted();
      }
    };

  }
]);