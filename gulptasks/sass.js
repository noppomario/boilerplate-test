
module.exports = function(gulp, path){
  'use strict';

  const sass = require('gulp-sass');
  const sourcemaps  = require('gulp-sourcemaps');


  return gulp.src(path.sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/styles'));

};
