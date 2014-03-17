var fs = require('fs');

var mkdir = function mkdir(paths, callback, acc) {
  fs.exists(paths.join('/'), function(exists) {
    if(exists === false) {
      acc = acc || [];
      acc.push(paths[acc.length]);
      fs.mkdir(acc.join('/'), function(error) {
        if(!error || error && error.code === 'EEXIST') {
          if(acc.length < paths.length) {
            mkdir(paths, callback, acc);
          } else {
            callback();
          }
        } else {
          console.error(error);
        }
      });
    } else {
      callback();
    }
  });
  
};

module.exports = {

  write: function(name, content, options) {
    var dir = options.destinationDirectory + '/src/';
    var src = dir + name;
    dir = (dir + name).split('/');
    delete dir[dir.length-1];
    mkdir(dir, function() {
      fs.writeFile(src, content, function(err) {
        if(err) {
          console.error(err);
        }
      });
    });
    return 'src/' + name;//relatif path
  }

}