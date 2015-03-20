
module.exports = function(gulp, path){
  'use strict';

  const source     = require('vinyl-source-stream');
  const browserify = require('browserify');
  const nodeUnderscorify = require('node-underscorify');

  return browserify('./'+path.tsMain, {
      debug:true,
    })
   .transform(nodeUnderscorify)
   .plugin('tsify', {
     noImplicitAny: true,
     target: 'ES5',
   })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(path.jsDir));

};

