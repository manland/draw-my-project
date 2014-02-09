/*
 * grunt-draw-my-project
 * http://manland.github.io/draw-my-project
 *
 * Copyright (c) 2014 Romain Maneschi
 * Licensed under the MIT license.
 */

'use strict';

var regex = {
  angularjs: {
    regexClassName: /.*?.(controller|factory|directive|filter)\(['|"](.+?)['|"]/,
    regexImports: /function/
  },
  requirejs: {
    regexClassName: /(define)\(['|"](.+?)['|"]/,
    regexImports: /function/
  }
};

var buildNode = function buildNode(name, optImports, optType) {
  var imports = optImports || [];
  var type = optType || '';
  if(name.charAt(0) === '$' && type === '') {
    type = 'angular';
  } 
  return {
    name: name,
    size: 1,
    imports: imports,
    type: type
  };
};

var foundImports = function foundImports(nodes, src, type) {
  var imports = [];

  var regexImports = regex[type].regexImports;

  var temp = src;
  var matches = temp.match(regexImports);

  if(matches !== null && matches !== undefined) {
    temp = temp.substr(0, matches.index);
    var importsTemp = temp.split(',');
    for(var i=0, len=importsTemp.length; i<len; i++) {
      var name = importsTemp[i].replace(/[^a-zA-Z0-9$\/]+/g, '');
      if(name !== '') {
        if(nodes[name] === undefined) {
          nodes[name] = buildNode(name);
        }
        imports.push(name);
      }
    }
  }

  return imports;
};

var foundNode = function foundNode(nodes, src, type) {
  var regexClassName = regex[type].regexClassName;

  var temp = src;
  var matches = temp.match(regexClassName);
  while(matches !== null) {
    var nodeType = matches[1];
    var name = matches[2];
    var firstCrochet = temp.indexOf('[', matches.index);
    var firstFunction = temp.indexOf('function', matches.index);
    var imports = [];
    temp = temp.substr(firstCrochet);
    if(firstCrochet < firstFunction) {
      imports = foundImports(nodes, temp, type);
    }
    if(nodes[name] === undefined) {
      nodes[name] = buildNode(name, imports, nodeType);
    } else {
      nodes[name].size = nodes[name].size + 1;
      nodes[name].imports = imports;
      nodes[name].type = nodeType;
    }
    matches = temp.match(regexClassName);
  }

  return nodes;
};

var exec = function exec(src, type) {
  var nodes = {};
  for(var i=0, len=src.length; i<len; i++) {
    nodes = foundNode(nodes, src[i], type);
  }
  var temp = [];
  for(var key in nodes) {
    temp.push(nodes[key]);
  }
  return temp;
};

module.exports = function(grunt) {

  grunt.registerMultiTask('draw_my_project', 'A grunt plugin who can draw your js files depencies', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: 'angularjs'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var srcIn = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      });

      // Write the destination file.
      grunt.file.write(f.dest, JSON.stringify(exec(srcIn, options.type)));
      var link = f.dest.split('/');
      link = link[link.length-1];
      var pathTemplate = grunt.file.exists('template/d3.html') ? 'template/d3.html' : 'node_modules/grunt-draw-my-project/template/d3.html';
      var content = grunt.template.process(grunt.file.read(pathTemplate), {data: {name: link}});
      grunt.file.write(f.dest+'.html', content);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
