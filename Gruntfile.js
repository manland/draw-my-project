/*
 * grunt-draw-my-project
 * http://manland.github.io/draw-my-project
 *
 * Copyright (c) 2014 Romain Maneschi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var gruntConfig = require( './gruntConfig.js' );

  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> : <%= pkg.author.url %>\n' +
        ' * Licensed <%= pkg.licenses[0].type %> <%= pkg.licenses[0].url %>\n' +
        ' */\n'
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= app_files.js %>',  
        '<%= test_files.js %>',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: [
      'tmp',
      '<%= build_dir %>', 
      '<%= compile_dir %>'
    ],

    copy: {
      build: {
        files: [
          {
            src: [ 
              '<%= app_files.js %>',
              '<%= app_files.tplHtml %>',
              '<%= vendor_files.js %>', 
              '<%= app_files.assets %>', 
              '<%= app_files.stylesheet %>' 
            ],
            dest: '<%= build_dir %>/',
            cwd: '.',
            expand: true
          }
        ]
      },
      compile: {
        files: [
          {
            src: [ '**/*' ],
            dest: '<%= compile_dir %>/assets',
            cwd: '<%= build_dir %>/template_src/assets',
            expand: true
          }
        ]
      }
    },

    concat: {
      compile_js: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [ 
          '<%= vendor_files.js %>', 
          '<%= build_dir %>/template_src/src/**/*.js'   
        ],
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      compile_css: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          'template_src/stylesheet/reset.css',
          '<%= app_files.stylesheet %>',
        ],
        dest: '<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>.css'
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>/template_src',
        src: [
          '<%= vendor_files.js %>',
          '<%= app_files.js %>',
          '<%= build_dir %>/**/*.css'
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= concat.compile_css.dest %>'
        ]
      }
    },

    watch: {
      files: [ 
        'tasks/*.js',
        '<%= app_files.html %>', 
        '<%= app_files.js %>', 
        '<%= vendor_files.js %>', 
        '<%= app_files.assets %>', 
        '<%= app_files.stylesheet %>', 
        '<%= test_files.js %>' 
      ],
      tasks: ['jshint', /*'karma:build:run',*/ 'build']
    },

    ngtemplates: {
      app: {
        src: 'src/**/*.tpl.html',
        cwd: 'template_src/',
        dest: '<%= build_dir %>/template_src/src/templates.js'
      }
    },

    // Configuration to be run (and then tested).
    draw_my_project: {
      options: {
        //templateFiles: ['template/d3.html', 'template/d3.js', 'template/d3.css']
        templateFiles: [
          'template/**/*'
        ]
      },
      simple: {
        options: {
          nbNodeByFile: 3
        },
        files: {
          'tmp/simple': ['test/fixtures/simple.js']
        }
      },
      complexe: {
        files: {
          'tmp/complexe': ['test/fixtures/complexe/**/*.js']
        }
      },
      skimbo: {
        files: {
          'tmp/skimbo': ['test/fixtures/skimbo/**/*.js']
        }
      },
      sturvive: {
        options: {
          type: 'requirejs'
        },
        files: {
          'tmp/sturvive': ['test/fixtures/sturvive/**/*.js']
        }
      },
      goo: {
        options: {
          type: 'requirejs',
          nbNodeByFile: -1
        },
        files: {
          'tmp/goo': ['test/fixtures/goo-require.js']
        }
      }

    }

  };

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-angular-templates');

  //TODO : mincss, minhtml, angularjstpl2js

  grunt.initConfig(grunt.util._.extend(taskConfig, gruntConfig));

  grunt.registerTask('test', ['draw_my_project', 'nodeunit']);
  grunt.registerTask('build', ['clean', 'copy:build', 'index:build', 'test']);
  grunt.registerTask('dev', ['jshint', 'build', 'watch']);
  grunt.registerTask('compile', ['jshint', 'build', 'ngtemplates', 'concat:compile_js', 'concat:compile_css', 'copy:compile', 'uglify:compile', 'index:compile', 'test']);
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+this.data.dir+')\/', 'g' );
    
    function filterForJS ( files ) {
      return files.filter( function ( file ) {
        return file.match( /\.js$/ );
      });
    }

    function filterForCSS ( files ) {
      return files.filter( function ( file ) {
        return file.match( /\.css$/ );
      });
    }

    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace('template_src/', '').replace( dirRE, '' );
    });

    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    var index = -1;
    for(var i=0, len=cssFiles.length; i<len && index === -1; i++) {
      if(cssFiles[i] === 'stylesheet/reset.css') {
        index = i;
      }
    }
    if(index > -1) {
      cssFiles.splice(index, 1);
      cssFiles.splice(0, 0, 'stylesheet/reset.css');
    }

    grunt.file.copy('template_src/index.tpl.html', this.data.dir + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            description: grunt.config( 'pkg.description' ),
            name: grunt.config('pkg.name'),
            favicon: grunt.config('app_files.favicon'),
            nojs_sentence: grunt.config('nojs_sentence')
          }
        });
      }
    });
  });

};
