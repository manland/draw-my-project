/*
 * grunt-draw-my-project
 * http://manland.github.io/draw-my-project
 *
 * Copyright (c) 2014 Romain Maneschi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    draw_my_project: {

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

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'draw_my_project', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
