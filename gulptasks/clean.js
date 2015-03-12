// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp){
  'use strict';

  const clean = require('gulp-clean');
  const __    = require('underscore');

  const cleanTestFiles = [
    'app/compiled-tests',
    'app/powered-tests',
    'app/dts',
  ];

  const cleanFiles = __.union([
    'app/styles',
    'app/scripts',
  ], cleanTestFiles);

  gulp.task("clean", function(){
    console.log('clean files', cleanFiles);
    return gulp.src(cleanFiles).pipe(clean());
  });

  gulp.task("clean:test", function(){
    console.log('clean test files', cleanTestFiles);
    return gulp.src(cleanTestFiles).pipe(clean());
  });

};
