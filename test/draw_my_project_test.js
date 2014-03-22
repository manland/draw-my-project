'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.draw_my_project = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },


  simple: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/simple.json');
    var expected = grunt.file.read('test/expected/simple.json');
    test.equal(actual, expected, 'should transform angularjs files into chart.');

    test.done();
  },
  complexe: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/complexe.json');
    var expected = grunt.file.read('test/expected/complexe.json');
    test.equal(actual, expected, 'should transform angularjs files into chart.');

    test.done();
  },
  skimbo: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/skimbo.json');
    var expected = grunt.file.read('test/expected/skimbo.json');
    test.equal(actual, expected, 'should transform angularjs files into chart.');

    test.done();
  },
  sturvive: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/sturvive.json');
    var expected = grunt.file.read('test/expected/sturvive.json');
    test.equal(actual, expected, 'should transform require files into chart.');

    test.done();
  },
  goo: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/goo.json');
    var expected = grunt.file.read('test/expected/goo-require.json');
    test.equal(actual, expected, 'should transform require files into chart.');

    test.done();
  },
  timeChecking: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/timeChecking.json');
    var expected = grunt.file.read('test/expected/timeChecking.json');
    test.equal(actual, expected, 'should transform nodejs files into chart.');

    test.done();
  },
  angularApp: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/angularApp.json');
    var expected = grunt.file.read('test/expected/angularApp.json');
    test.equal(actual, expected, 'should transform angularjs files into chart.');

    test.done();
  },
  plotsManager: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/plotsManager.json');
    var expected = grunt.file.read('test/expected/plotsManager.json');
    test.equal(actual, expected, 'should transform java files into chart.');

    test.done();
  },
  angularjsDashboard: function(test) {
    test.expect(1);
    
    var actual = grunt.file.read('tmp/angularjsDashboard.json');
    var expected = grunt.file.read('test/expected/angularjsDashboard.json');
    test.equal(actual, expected, 'should transform js files into chart.');

    test.done();
  }


};
