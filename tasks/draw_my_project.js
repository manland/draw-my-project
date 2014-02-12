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
    regexClassName: /.*?[^$](controller|factory|directive|filter)\(['|"](.+?)['|"]/,
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

var foundImports = function foundImports(nodes, src, options) {
  var imports = [];

  var regexImports = regex[options.type].regexImports;

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

var foundNode = function foundNode(nodes, src, options) {
  var regexClassName = regex[options.type].regexClassName;

  var temp = src;
  var matches = temp.match(regexClassName);
  var count = 0;
  while(matches !== null && (options.nbNodeByFile === -1 || count < options.nbNodeByFile)) {
    var nodeType = matches[1];
    var name = matches[2];
    var firstCrochet = temp.indexOf('[', matches.index);
    var firstFunction = temp.indexOf('function', matches.index);
    var imports = [];
    temp = temp.substr(firstCrochet);
    if(firstCrochet < firstFunction) {
      imports = foundImports(nodes, temp, options);
    }
    if(nodes[name] === undefined) {
      nodes[name] = buildNode(name, imports, nodeType);
    } else {
      nodes[name].size = nodes[name].size + 1;
      nodes[name].imports = imports;
      nodes[name].type = nodeType;
    }
    matches = temp.match(regexClassName);
    count = count + 1;
  }

  return nodes;
};

var exec = function exec(src, options) {
  var nodes = {};
  for(var i=0, len=src.length; i<len; i++) {
    nodes = foundNode(nodes, src[i], options);
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
      type: 'angularjs',
      nbNodeByFile: 1,
      title: 'Draw my project',
      description: 'Draw your project dependencies !'
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var time = new Date().getTime();

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

      // Write the json file.
      grunt.file.write(f.dest, JSON.stringify(exec(srcIn, options)));
      var link = f.dest.split('/');
      link = link[link.length-1];

      //Write template files
      var pathTemplate = grunt.file.exists('template/d3.html') ? 'template/' : 'node_modules/grunt-draw-my-project/template/'; 
      var templateFiles = ['d3.html', 'd3.css', 'd3.js'];

      var time2 = new Date().getTime();

      for(var i=0, len=templateFiles.length; i<len; i++) {
        var content = grunt.template.process(grunt.file.read(pathTemplate + templateFiles[i]), {data: {
          cssFileName: link+'.css',
          jsFileName: link+'.js',
          jsonName: link,
          title: options.title,
          description: options.description,
          type: options.type,
          timeGeneration: (time2 - time)
        }});
        grunt.file.write(f.dest+'.'+templateFiles[i].split('.')[1], content);
      }

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
