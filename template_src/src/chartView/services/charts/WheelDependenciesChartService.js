angular.module('app').service('WheelDependenciesChartService', [
  'ConstantsService', 'ScreenSizeService', 'ChartMouseService',
  function(constantsService, screenSizeService, chartMouseService) {

    var svg, link, node;

    var mouseovered = function mouseovered(d) {
      node.each(function(n) { n.target = n.source = false; });

      link.classed("link--target", function(l) { 
        if (l.target === d) {
          return l.source.source = true; 
        }
      }).classed("link--source", function(l) { 
        if (l.source === d) {
          return l.target.target = true;
        }
      }).filter(function(l) {//add on top a new link to pass first
        return l.target === d || l.source === d; 
      }).each(function() { 
        this.parentNode.appendChild(this); 
      });

      node
        .classed("hover", function(n) { 
          return n.name === d.name ||
            _.contains(chartMouseService.getKeepNodes(), n.name);
        })
        .classed("node--target", function(n) { return n.target; })
        .classed("node--source", function(n) { return n.source; });
    };

    var mouseouted = function mouseouted() {
      link
        .classed("link--target", function(l) { 
          return _.contains(chartMouseService.getKeepNodes(), l.target.name);
        })
        .classed("link--source", function(l) { 
          return _.contains(chartMouseService.getKeepNodes(), l.source.name);
        });

      node
        .classed("hover", function(n) { 
          return _.contains(chartMouseService.getKeepNodes(), n.name); 
        })
        .classed("node--target",  function(n) { 
          return _.contains(chartMouseService.getKeepNodes(), n.name) &&
            n.target; 
        })
        .classed("node--source", function(n) { 
          return _.contains(chartMouseService.getKeepNodes(), n.name) &&
            n.source; 
        });
    };

    var mouseclick = function mouseclick(d) {
      chartMouseService.mouseClick(d);
    };

    var packageHierarchy = function packageHierarchy(classes) {
      var map = {};

      var find = function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if(node.children === undefined) {
            node.children = [];
          }
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(constantsService.getPathSeparator())));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      };

      classes.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    };

    var packageImports = function packageImports(nodes) {
      var map = {}, imports = [];

      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      nodes.forEach(function(d) {
        if (d.imports) {
          d.imports.forEach(function(i) {
            imports.push({source: map[d.name], target: map[i]});
          });
        }
      });

      return imports;
    };

    return {
      buildChart: function(domElement, data) {
        var diameter = screenSizeService.getDiameterChart(),
          radius = diameter / 2,
          innerRadius = radius - 150;

        var cluster = d3.layout.cluster()
          .size([360, innerRadius])
          .sort(null)
          .value(function(d) { return d.size; });

        var bundle = d3.layout.bundle();

        var line = d3.svg.line.radial()
          .interpolate("bundle")
          .tension(0.85)
          .radius(function(d) { return d.y; })
          .angle(function(d) { return d.x / 180 * Math.PI; });

        var zoom = function zoom() {
          svg.attr("transform", 
            "translate("+d3.event.translate+")scale("+d3.event.scale+")"
          );
        };

        if(svg !== undefined) {
          svg.remove();
        }

        svg = d3.select(domElement)
          .append("svg")
            .attr("width", screenSizeService.getWidth())
            .attr("height", screenSizeService.getHeightChart())
            .attr("viewBox", "0 0 "+diameter+" "+diameter)
            .attr("viewBox", "0 0 "+diameter+" "+diameter)
            .call(d3.behavior.zoom()
              .scaleExtent([0.1, 15])
              .translate([radius, radius])
              .on("zoom", zoom))
          .append("g")
            .attr("transform", "translate(" + radius + "," + radius + ")");
          
        link = svg.append("g").selectAll(".link");
        node = svg.append("g").selectAll(".node");

        var draw = function draw(classes) {
          var nodes = cluster.nodes(packageHierarchy(classes)),
              links = packageImports(nodes);
          
          link = link
              .data(bundle(links))
            .enter().append("path")
              .each(function(d) { 
                d.source = d[0]; 
                d.target = d[d.length - 1]; 
              })
              .attr("class", "link")
              .attr("d", line);

          node = node
              .data(nodes.filter(function(n) { return !n.children; }))
            .enter().append("text")
              .attr("class", function(d) { return "node " + d.type; })
              .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
              .attr("dy", ".31em")
              .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")" + (d.x < 180 ? "" : "rotate(180)"); })
              .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
              .text(function(d) { return d.key; })
              .on("mouseover", mouseovered)
              .on("mouseout", mouseouted)
              .on("click", mouseclick);
        };

        draw(data);

      },
      mouseOver: function(nodeName) {
        node.each(function(n) {
          if(n.name === nodeName) {
            mouseovered(n);
          }
        });
      },
      mouseOut: function(keepNodes) {
        mouseouted(keepNodes);
      }
    };

  }
]);