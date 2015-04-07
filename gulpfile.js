'use strict';

// Project Information
const project = require('./package.json');
const personal = require('./personalSettings.json');

// Gulp Utils
const gulp = require('gulp');
const gutil = require('gulp-util');

const path = {
  tsFiles:       'app/typescripts/**/*.ts',
  dtsFiles:      'app/typescripts/typings/**/*.ts',
  tsTests:       'app/typescripts/tests/**/*.ts',
  tsMain:        'app/typescripts/app.ts',
  sassFiles:     'app/scss/**/*.scss',
  jsDir:         'app/scripts',
};

gulp.task('compile-all', function(){
  const runSequence = require('run-sequence');
  return runSequence('lint','compile-index');
});

gulp.task('compile-index', function(){
  return require('./gulptasks/webpack_build')(gulp, path);
});

gulp.task('test:phantom', function(){
  const runSequence = require('run-sequence');
  return runSequence('compile-test', 'karma:phantom');
});

gulp.task('test:remote', function(){
  const runSequence = require('run-sequence');
  return runSequence('compile-test', 'karma:select');
});

gulp.task('compile-test', function(){
  return require('./gulptasks/webpack_test')(gulp, path);
});

gulp.task('karma:phantom', function(){
  return karma(['PhantomJS']);
});

gulp.task('karma:select', function(){
  return karma([]);
});

var karma = function(browser){
  const karma = require('karma').server;
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    browsers: browser,
    singleRun: true
  }, function(){});
};


gulp.task('lint', function(){
  return require('./gulptasks/lint')(gulp, path);
});

gulp.task('sass', function(){
  return require('./gulptasks/sass')(gulp, path);
});

gulp.task('template', function(){
  if( ! gutil.env.baki ){
    process.exit(1);
  }
  const argv = JSON.parse( gutil.env.baki );

  return require('./gulptasks/template')(gulp, argv);
});

gulp.task('watch', function(){
  if( ! gutil.env.baki ){
    process.exit(1);
  }
  const argv = JSON.parse( gutil.env.baki );

  return require('./gulptasks/watch')(gulp, path, argv);
});

gulp.task('server', function(){
  return require('./gulptasks/server')(project);
});

gulp.task('open', function(){
  return require('./gulptasks/open')(gulp, personal, 'app');
});

gulp.task('opendoc', function(){
  return require('./gulptasks/open')(gulp, personal, 'doc');
});

gulp.task('opencov', function(){
  return require('./gulptasks/open')(gulp, personal, 'coverage');
});

gulp.task('typedoc', function(){
  return require('./gulptasks/doc')(gulp, path, project);
});

gulp.task('clean', function(){
  return require('./gulptasks/clean')(gulp, 'all');
});

gulp.task('clean:test', function(){
  return require('./gulptasks/clean')(gulp, 'test');
});

gulp.task('man', function(){
  return require('./gulptasks/man')();
});

gulp.task('hello', function(){
  return require('./gulptasks/hello')(personal);
});

gulp.task('nyamazing', function(){
  return require('./gulptasks/nyamazing')();
});

