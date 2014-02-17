# grunt-draw-my-project

> A grunt plugin that draws your javascript project dependencies.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-draw-my-project --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-draw-my-project');
```

## The "draw_my_project" task

### Overview
In your project's Gruntfile, add a section named `draw_my_project` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  draw_my_project: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.type
Type: `String`
Default value: `angularjs`
Accepted values : `angularjs`, `requirejs`

A string value that is used to find node and dependecies type.

#### options.nbNodeByFile
Type: `Int`
Default value: `1`
Special value: `-1` infinite search

An int to indicate the number of node who can be found in a file. In most case, one file have one class declaration, but for minified files all dependencies are in one file, so you must set this number to -1.

#### options.pathSeparator
Type: `String`
Default value: `/`

A string value to indicate the path separator. Permit to aggregate same classes in the final graph. If `options.type === angularjs` and `options.sortByAngularType === true` all classes are grouped by service, factory, directive, controller or filter.

#### options.sortByAngularType
Type: `Boolean`
Default value: `true`
<i>Ignored if options.type is requirejs</i>

A boolean value to indicate if classes must be grouped by service, factory, directive, controller or filter.

#### options.title
Type: `String`
Default value: `Draw my project`

A string value that is used in title of html result page.

#### options.description
Type: `String`
Default value: `Draw your project dependencies !`

A string value that is used in description of html result page.

#### options.favicon
Type: `String`
Default value: `assets/img/logo.png`

A string value that is used in favicon of html result page.

### Usage Examples

#### Default Options
In this example, the default options are used. So if the `app.js` file is a simple AngularJs project with one `Controller`, the generated result should show a one wheel dependencies with one dependence.

```js
grunt.initConfig({
  draw_my_project: {
    options: {},
    files: {
      'dest/default_options': ['src/app.js'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to generate dependencies. So if the `minified.js` file is a RequireJs project with all dependencies. The generated result should show a wheel dependencies with all dependences.

```js
grunt.initConfig({
  draw_my_project: {
    options: {
      type: 'requirejs',
      nbNodeByFile: '-1',
      title: 'My project title',
      description: 'My project can do anything !'
    },
    files: {
      'dest/default_options': ['src/minified.js'],
    },
  },
});
```

#### Custom Options
In this example, custom options are used to generate dependencies. So if the `*.js` files are RequireJs project with all dependencies. The generated result should show a wheel dependencies with all dependences.

```js
grunt.initConfig({
  draw_my_project: {
    options: {
      type: 'requirejs',
      nbNodeByFile: '-1',
      title: 'My project title',
      description: 'My project can do anything !'
    },
    files: {
      'dest/default_options': ['src/**/*.js'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

###0.2.1

* first shoot of #7 but hot experimental
* close #16
* close #15
* close #13
* close #12
* close #9
* close #8

###0.2.0

* new beatiful skin made by @undless
* add hierarchical chart
* close #6
* close #3

###0.1.3

* fix #2
* fix #4
* add a menu according to #3 (first shoot)

###0.1.2

* fix #1
* fix #2
* improve README

###0.1.1

* add RequireJs dependencies
* improve generated css

###0.1.0

* first release based on AngularJs
