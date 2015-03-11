"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var clean = require('gulp-clean');

  const cleanFile = [
    'app/compiled-tests',
    'app/powered-tests',
    'app/dts',
    'app/scripts',
    'app/styles'
  ];

  const cleanTestFile = [
    'app/compiled-tests',
    'app/powered-tests',
    'app/dts',
    'app/scripts'
  ];

  gulp.task("clean", function(){
    return gulp.src(cleanFile).pipe(clean());
  });

  gulp.task("clean:test", function(){
    return gulp.src(cleanTestFile).pipe(clean());
  });

};
