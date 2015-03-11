"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

// Documents

module.exports = function(gulp, path){
  var typedoc     = require('gulp-typedoc');
  
  const docTarget = [ path.tsFiles, '!'+path.dtsFiles, '!'+path.tsTests];
  
  gulp.task('typedoc', function() {
    return gulp.src(docTarget)
      .pipe(typedoc({
        module: 'commonjs',
        out: './docs',
        name: project.name,
        target: 'es5'
      }));
  });
};
