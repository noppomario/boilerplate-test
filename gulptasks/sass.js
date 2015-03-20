
module.exports = function(gulp){
  'use strict';

  const sass = require('gulp-sass');
  const sourcemaps  = require('gulp-sourcemaps');


  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/styles'));

};
