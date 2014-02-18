/*
 * grunt-draw-my-project
 * http://manland.github.io/draw-my-project
 *
 * Copyright (c) 2014 Romain Maneschi
 * Licensed under the MIT license.
 */

'use strict';

var configs = {
  angularjs: {
    regexClassName: /.*?[^$](controller|factory|directive|filter)\(['|"](.+?)['|"]/,
    regexImports: /function/,
    callbackAfter: function(nodes, options) {
      if(options.sortByAngularType === true) {
        var key;
        //first add path to imports
        for(key in nodes) {
          for(var i=0, len=nodes[key].imports.length; i<len; i++) {
            var importName = nodes[key].imports[i];
            nodes[key].imports[i] = nodes[importName].type + options.pathSeparator + nodes[importName].name;
          }
        }
        //second add path to node
        for(key in nodes) {
          nodes[key].name = nodes[key].type + options.pathSeparator + nodes[key].name;
        }
      }
      return nodes;
    }
  },
  requirejs: {
    regexClassName: /(define)\(['|"](.+?)['|"]/,
    regexImports: /function/,
    callbackAfter: function(nodes, options) {
      return nodes;
    }
  },
  nodejs: {
    regexClassName: /(require)\(['|"](.+)['|"]\)/,
    regexImports: /module.exports\s*=\s*[new]*([^\(]+)/,
    callbackAfter: function(nodes, options) {
      return nodes;
    }
  }
};

var buildNode = function buildNode(name, optFilepath, optSize, optImports, optType) {
  var filepath = optFilepath || '';
  var size = optSize || 1;
  var imports = optImports || [];
  var type = optType || '';
  if(name.charAt(0) === '$' && type === '') {
    type = 'angular';
  } 
  return {
    name: name,
    filepath: filepath,
    size: size,
    imports: imports,
    type: type
  };
};

var foundImports = function foundImports(nodes, src, options) {
  var imports = [];

  var regexImports = configs[options.type].regexImports;

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

var foundNode = function foundNode(nodes, src, filepath, options) {
  var regexClassName = configs[options.type].regexClassName;

  var temp = src;
  var matches = temp.match(regexClassName);
  var count = 0;
  while(matches !== null) {
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
      nodes[name] = buildNode(name, filepath, src.length, imports, nodeType);
    } else {
      nodes[name].filepath = filepath;
      nodes[name].size = src.length;
      nodes[name].imports = imports;
      nodes[name].type = nodeType;
    }
    count = count + 1;
    if(options.nbNodeByFile === -1 || count < options.nbNodeByFile) {
      matches = temp.match(regexClassName);
    } else {
      matches = null;
    }
  }

  return nodes;
};

var exec = function exec(files, options) {
  var nodes = {};
  for(var i=0, len=files.length; i<len; i++) {
    nodes = foundNode(nodes, files[i].src, files[i].filepath, options);
  }
  nodes = configs[options.type].callbackAfter(nodes, options);
  var temp = [];
  for(var key in nodes) {
    temp.push(nodes[key]);
  }
  return temp;
};

module.exports = function(grunt) {

  grunt.registerMultiTask('draw_my_project', 'A grunt plugin who can draw your js files depencies', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    grunt.template.addDelimiters("square", "[%", "%]");
    var options = this.options({
      type: 'angularjs',
      nbNodeByFile: 1,
      pathSeparator: '/',
      sortByAngularType: true,
      title: 'Draw_my_project',
      description: 'Draw your project dependencies !',
      favicon: 'assets/img/logo.png',
      link: 'https://github.com/manland/draw-my-project',
      urlLogo: 'assets/img/logo.png',
      templateFiles: [
        'node_modules/grunt-draw-my-project/template/**/*'
      ]
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      var time = new Date().getTime();

      var filesIn = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return {
          filepath: filepath,
          src: grunt.file.read(filepath)
        };
      });

      // Write the json file.
      var resData = JSON.stringify(exec(filesIn, options));
      grunt.file.write(f.dest + '.json', resData);

      var time2 = new Date().getTime();

      var files = grunt.file.expand(options.templateFiles);
      for(var i=0, len=files.length; i<len; i++) {
        if(grunt.file.isFile(files[i])) {

          //delete template root dir
          var directories = files[i].split('/');
          var finalPath = '';
          for(var t=directories.length-1, lenD=0; t>=lenD; t--) {
            if(directories[t] === 'template') {
              t = -1;
            } else {
              if(finalPath !== '') {
                finalPath = '/' + finalPath;
              }
              finalPath = directories[t] + finalPath;
            }
          }

          //select files to process because for img break the file !
          var extension = files[i].split('.');
          extension = extension[extension.length-1];
          if(extension === 'js' | extension === 'css' || extension === 'html') {
            console.log('process : ', files[i]);
            var content = grunt.template.process(grunt.file.read(files[i]), {
              delimiters: 'square',
              data: {
                title: options.title,
                description: options.description,
                favicon: options.favicon,
                link: options.link,
                urlLogo: options.urlLogo,
                pathSeparator: options.pathSeparator,
                type: options.type,
                timeGeneration: (time2 - time),
                jsonData: resData
              }
            });

            //Replace JSON.parse("...") by JSON.parse('...') because all objects are write with ""
            var matches = content.match(/JSON.parse\((\".+?)\"\)/g);
            if(matches !== null && matches.length > 0) {
              var toUpdate = matches[0];
              toUpdate = toUpdate.replace(/JSON.parse\(\"/g, "JSON.parse('");
              toUpdate = toUpdate.replace(/\"\)/g, "')");
              content = content.replace(/JSON.parse\((\".+?)\"\)/g, toUpdate);
            }
            grunt.file.write(f.dest+'/'+finalPath, content);
          } else {
            grunt.file.copy(files[i], f.dest+'/'+finalPath);
          }
        }
      }

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
