/*
 * grunt-draw-my-project
 * http://manland.github.io/draw-my-project
 *
 * Copyright (c) 2014 Romain Maneschi
 * Licensed under the MIT license.
 */

'use strict';

var advicesHelper = require('./lib/advicesHelper');

var configs = {
  angularjs: require('./parsers/angularjs'),
  requirejs: require('./parsers/requirejs'),
  nodejs: require('./parsers/nodejs')
};

var exec = function exec(files, options) {
  var nodes = {};
  for(var i=0, len=files.length; i<len; i++) {
    nodes = configs[options.type].foundNode(
      nodes, 
      files[i].src, 
      files[i].filepath, 
      options
    );
  }
  nodes = configs[options.type].callbackAfter(nodes, options);
  //object to array
  var temp = [];
  for(var key in nodes) {
    temp.push(nodes[key]);
  }
  nodes = temp;

  var advicesRes = advicesHelper.buildAdvices(options, nodes);

  return {
    nodes: nodes,
    advices: advicesRes
  };
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
      ],
      advices: advicesHelper.defaults()
    });

    options.advices = advicesHelper.initOptions(options.advices);

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
      var resData = exec(filesIn, options);
      grunt.file.write(f.dest + '.json', JSON.stringify(resData));

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
          if(extension === 'js' || extension === 'css' || extension === 'html') {
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
                jsonData: JSON.stringify(resData.nodes),
                jsonAdvices: JSON.stringify(resData.advices),
              }
            });

            //Replace JSON.parse("...") by JSON.parse('...') because all objects are write with ""
            var matches = content.match(/JSON.parse\((\".+?)\"\)/g);
            if(matches !== null && matches.length > 0) {
              //data
              var toUpdate = matches[0];
              toUpdate = toUpdate.replace(/JSON.parse\(\"/g, "JSON.parse('");
              toUpdate = toUpdate.replace(/\"\)/g, "')");
              content = content.replace(matches[0], toUpdate);
              //advices
              toUpdate = matches[1];
              toUpdate = toUpdate.replace(/JSON.parse\(\"/g, "JSON.parse('");
              toUpdate = toUpdate.replace(/\"\)/g, "')");
              content = content.replace(matches[1], toUpdate);
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
