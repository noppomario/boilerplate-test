"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var sass = require('gulp-sass');
  var sourcemaps  = require('gulp-sourcemaps');

  gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('app/styles'));
  });

};
