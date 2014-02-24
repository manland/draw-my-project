angular.module('app').service('PackageTreeChartService', [
  'ConstantsService', 'ScreenSizeService', 'ChartMouseService',
  function(constantsService, screenSizeService, chartMouseService) {

    var link, node, links, nodes;

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
      node.each(function(n) { n.target = n.source = false; });

      link
      .classed("link--target", function(l) { 
        if (l.target === d) {
          return l.source.source = true; 
        }
      })
      .classed("link--source", function(l) { 
        if (l.source === d) {
          return l.target.target = true;
        }
      })
      .filter(function(l) { 
        return l.target === d || l.source === d; 
      })
      .each(function() { 
        this.parentNode.appendChild(this); 
      });

      node
        .classed("hover", function(n) { return d !== undefined && n.name === d.name; })
        .classed("node--target", function(n) { return n.target; })
        .classed("node--source", function(n) { return n.source; });
    };

    var mouseclick = function mouseclick(d) {
      chartMouseService.mouseClick(d.name);
    };

    var mouseouted = function mouseouted(d) {
      link
        .classed("link--target", false)
        .classed("link--source", false);

      node
        .classed("hover", function(d) { 
          return d !== undefined && _.contains(chartMouseService.getKeepNodes(), d.name); 
        })
        .classed("node--target", false)
        .classed("node--source", false);
    };

    return {
      buildChart: function(domElement, data) {
        var diameter = screenSizeService.getDiameterChart(),
          radius = diameter / 2,
          innerRadius = radius - 100;

        var tree = d3.layout.tree()
            .size([360, innerRadius])
            .separation(function(a, b) { return (a.parent === b.parent ? 1 : 2) / a.depth; });

        var diagonal = d3.svg.diagonal.radial()
            .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

        var svg = d3.select(domElement).append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("viewBox", "0 0 "+diameter+" "+diameter)
          .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");

        var draw = function draw(root) {
          nodes = tree.nodes(root);
          links = tree.links(nodes);

          link = svg.selectAll(".link")
              .data(links)
            .enter().append("path")
              .attr("class", "link")
              .attr("d", diagonal);

          node = svg.selectAll(".node")
              .data(nodes)
            .enter().append("g")
              .attr("class", function(d) { return "node " + d.type; })
              .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
              .on("mouseover", mouseovered)
              .on("mouseout", mouseouted)
              .on("click", mouseclick);

          node.append("circle")
              .attr("r", 4.5);

          node.append("text")
              .attr("dy", ".31em")
              .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
              .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
              .text(function(d) { return d.name; });
        };

        draw(data);
      },
      mouseOver: function(nodeName) {
        mouseovered(findNode(nodeName, nodes));
      },
      mouseOut: function(nodeName) {
        mouseouted();
      }
    };

  }
]);