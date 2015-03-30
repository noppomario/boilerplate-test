
module.exports = function(gulp, path){
  'use strict';

  const source     = require('vinyl-source-stream');
  const browserify = require('browserify');
  const nodeUnderscorify = require('node-underscorify');

  const plumber = require('gulp-plumber');
  const handleErrors = require('./handleErrors');

  return browserify('./'+path.tsMain, {
      debug:true,
    })
   .transform(nodeUnderscorify)
   .plugin('tsify', {
     noImplicitAny: true,
     target: 'ES5',
   })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('index.js'))
    .pipe(gulp.dest(path.jsDir));

};

