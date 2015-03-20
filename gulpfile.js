'use strict';

// Project Information
const project = require('./package.json');
const personal = require('./personalSettings.json');

// Gulp Utils
const gulp = require('gulp');
const gutil = require('gulp-util');

const colors = require('colors');

console.log('Yeah!'.red);

const path = {
  tsFiles:  'app/typescripts/**/*.ts',
  dtsFiles: 'app/typescripts/typings/**/*.ts',
  tsTests:  'app/typescripts/tests/**/*.ts',
  tsMain:   'app/typescripts/app.ts',
  jsDir:    'app/scripts',
};


gulp.task('compile-all', ['lint', 'compile-index']);

gulp.task('compile-index', function(){
  require('./gulptasks/build')(gulp, path);
});

gulp.task('lint', function(){
  require('./gulptasks/lint')(gulp, path);
});

gulp.task('sass', function(){
  require('./gulptasks/sass')(gulp);
});

gulp.task('template', function(){
  if( ! gutil.env.baki ){
    process.exit(1);
  }
  const argv = JSON.parse( gutil.env.baki );

  require('./gulptasks/template')(gulp, argv);
});

gulp.task('server', function(){
  require('./gulptasks/server')(project);
});

gulp.task('open', function(){
  require('./gulptasks/open')(gulp, personal);
});

gulp.task('typedoc', function(){
  require('./gulptasks/doc')(gulp, path, project);
});

gulp.task('hello', function(){
  require('./gulptasks/hello')(personal);
});

gulp.task('nyamazing', function(){
  require('./gulptasks/nyamazing')();
});

const test  = require('./gulptasks/test')(gulp, path);
const clean = require('./gulptasks/clean')(gulp);

