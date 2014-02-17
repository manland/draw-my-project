module.exports = {
  
  build_dir: 'build',
  compile_dir: 'bin',

  nojs_sentence: 'Please, activate javascript in your browser !',

  app_files: {
    js: [ 'template_src/src/**/*.js' ],
    html: [ 'template_src/index.tpl.html' ],
    tplHtml: [ 'template_src/src/**/*.tpl.html' ],
    stylesheet: ['template_src/stylesheet/**/*.css'],
    assets: ['template_src/assets/**/*']
  },

  test_files: {
    js: [
      'template_src/test/**/*.js'
    ]
  },

  vendor_files: {
    js: [ 
      'template_src/vendor/d3/d3.js',
      'template_src/vendor/angular/angular.js',
      'template_src/vendor/angular-route/angular-route.js',
      'template_src/vendor/underscore/underscore.js'
    ],
    css: [],
    assets: []
  },
};
