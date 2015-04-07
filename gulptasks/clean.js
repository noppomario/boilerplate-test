
module.exports = function(gulp, type){
  'use strict';

  const clean = require('gulp-clean');
  const __    = require('underscore');

  const cleanTestFiles = [
    'app/compiled-tests',
  ];

  const cleanAllFiles = __.union([
    'app/styles',
    'app/scripts',
  ], cleanTestFiles);

  const types = {
    all: {
      message: 'clean all files',
      files:   cleanAllFiles,
    },
    test: {
      message: 'clean test files',
      files:   cleanTestFiles,
    },
  };


  if ( types[type] == undefined ) {
    console.log('no clean target');
    process.exit(1);
  }

  console.log( types[type].message, types[type].files );
  return gulp.src(types[type].files).pipe(clean());

};
