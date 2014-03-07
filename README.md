# grunt-draw-my-project

> A grunt plugin that draws your javascript project dependencies.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin by add this line in your package.json :

```json
...
devDependencies: {
   ...
   "grunt-draw-my-project": "git://github.com/manland/draw-my-project.git"
   ...
}
...
```

And make a :

```shell
npm install
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

#### options.link
Type: `String`
Default value: `https://github.com/manland/draw-my-project`

A string value that is used to link in header.

#### options.urlLogo
Type: `String`
Default value: `assets/img/logo.png`

A string value that is used in src of img header.

#### options.advices
Type: `Object`
Default value: `all advices`
Special value: `false` no advice

Advices :

* controllerImports : `A controller must import $scope and 1 service (its own).`
* fileClassName : `A class must have same name as its own filename.`
* notUsed : `A class with no import and no class point to it.` 
  * options : __desableNodeType__ `An array of string node type (service, factory, directory...).` Default is `[]`.
* rootScope : `Use of $rootScope is bad.`
* sizeControllerTooImportant : `Controller size must not be greater than 20% of services.`
  * options: __sizeMaxCtrlComparedToService__ `An integer between 0 and 1 wich represents the percent of services for controllers.` Default is `0.2`.
* tooInjectDependencies : `A class must not inject more than 5 classes.`
  * options : __nbMax__ `An integer wich represent the number max of imports.` Default is `5`.
* fileNameEnd : `A class must end with Srv if it's a service, Ctrl for a controller.`
  * options : __suffix__ `An object where key is node type and value is the suffix.` Default is `{'service': 'Srv', 'factory': 'Srv', 'controller': 'Ctrl'}.`

All advices can have a configured `gravityLevel` set to 0 (not serious), 1 (significant) or 2 (hot). For example to put controllerImports to `notSerious` advice just add to your options :

```js
options: {
  advices: {
    filenameEnd: {
      gravityLevel: 0
    }
  }
}
```

To desable fileClassName and tooInjectDependencies advices, or to configure fileNameEnd for service end with `Service` instead of `Srv` just put :

```js
options: {
  advices: {
    fileClassName: false,
    tooInjectDependencies: false,
    filenameEnd: {
      suffix: {
        'service': 'Service'
      }
    }
  }
}
```

### Usage Examples

#### Default Options
In this example, the default options are used. So if the `app.js` file is a simple AngularJs project with one `Controller`, the generated result should show a one wheel dependencies with one dependence.

```js
grunt.initConfig({
  draw_my_project: {
    options: {},
    your_target: {
      files: {
        'dest/default_options': ['src/app.js'],
      }
    }
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
    your_target: {
      files: {
        'dest/default_options': ['src/minified.js'],
      }
    }
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
    your_target: {
      files: {
        'dest/default_options': ['src/**/*.js'],
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

###0.3.4

* close #54 #55 #56 : advice if filename doesn't end with a configurable pattern
* close #38 : better node parsers architecture
* close #53 : angular rexep is bad if there is a space before first function

###0.3.3

* close #51 : permit to no-declare injection string in angularjs type (linked to add advice in #52)
* close #50 : change width and height to max-width and max-height on logo header

###0.3.2

* close #36 : beatiful [gh-pages](http://manland.github.io/draw-my-project/) ! Thx to @undless for its advices ! <3
* close #49 : button file view in chrome(imum) was bad sized
* close #7 : add nodejs type

###0.3.1

* close #33 : size chart with screen size + redraw on window resize
* first of #21 : keep node selected on click
* continue #7 : nodejs parser

###0.3.0

* close #31 : modif footer color
* close #32 : add a css minifier
* close #29 : hilight node which is mouseover in filter or advices sections
* first shoot of #38 : rework parsers architecture
* close #34 : center text in sizeChart
* close #28 : advices options
* close #44 : add a triangle to show the file view menu is openbale
* close #43 : add service provider value constant with factorie color + config run with angular color

###0.2.3

* close #14 : new hierarchical pie chart
* close #24 : save view state in localStorage
* close #11 : rework colors
* close #25 : add size controller too important advice (if >80% of services size)
* close #27 : add too inject dependencies advice (if >5 significant and >10 hot) 

###0.2.2

* close #10
* close #19
* close #14 : new charts, need more graphical work
* close #20
* close #23
* close #18

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
