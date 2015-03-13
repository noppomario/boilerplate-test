// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp, path){
  'use strict';

  const source     = require('vinyl-source-stream');
  const browserify = require('browserify');
  const nodeUnderscorify = require('node-underscorify');

  gulp.task('compile-all', ['lint', 'compile-index']);

  gulp.task('compile-index', function(){
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
  });

};

