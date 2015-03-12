// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp){
  'use strict';

  const sass = require('gulp-sass');
  const sourcemaps  = require('gulp-sourcemaps');

  gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('app/styles'));
  });

};
