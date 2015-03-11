"use strict";

// Project Information
var project = require('./package.json');
var personal = require('./personalSettings.json');

// Gulp Utils
var gulp = require("gulp");
var gutil = require("gulp-util");
var eventStream = require('event-stream');
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');

// Module
var browserify = require('browserify');
var nodeUnderscorify = require('node-underscorify');

// Test
var karma = require('karma').server;
var mocha = require("gulp-mocha");
var espower = require("gulp-espower");
var ts =    require("gulp-typescript");
var sourcemaps  = require('gulp-sourcemaps');
var espowerify  = require('espowerify');
//var plumber     = require('gulp-plumber');

// Lint
var tslint      = require('gulp-tslint');
var tslintConfig = require('./tslint.json');

// Open Web Browser
var os   = require('os');
var open = require('gulp-open');

var path = {
  tsFiles:  'app/typescripts/**/*.ts',
  dtsFiles: 'app/typescripts/typings/**/*.ts',
  tsTests:  'app/typescripts/tests/**/*.ts',
  tsMain:   'app/typescripts/app.ts',
  jsDir:    'app/scripts',
};

var osType = {
  'linux':   'Linux',
  'ubuntu':  'Linux',
  'mac':     'Darwin',
  'osx':     'Darwin',
  'windows': 'Windows_NT',
  'win':     'Windows_NT',
}

gulp.task('open', function(){
  var currentOS = 'auto';
  if ( personal.os != undefined ){
    currentOS = osType[personal.os.toLowerCase()] || 'auto';
  }
  if ( currentOS === 'auto' ){
    currentOS = os.type();
  }

  console.log(currentOS);

  var currentWebBrowser = 'auto';

  if ( currentOS === 'Linux' ){
    gulp.src('app/index.html')
      .pipe(open('',{app: 'chromium-browser', url: 'http://localhost:4649/' }));
  } else if ( currentOS === 'Windows_NT' ){

  } else if ( currentOS === 'Darwin' ){

  }

});



// compile all with lint
gulp.task('compile-all', ['lint', 'compile-index']);

function handleError(err){
  console.log(err.toString());
  this.emit('end');
}

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

gulp.task('lint', function(){
  return gulp.src([
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsTests,
    ])
    .pipe(tslint({
      configuration: tslintConfig
    }))
    .pipe(tslint.report('prose' // short error message
    //.pipe(tslint.report('verbose' // long error message
                        ,{emitError:false} // not end task
                        ));
});


// compile modules

gulp.task("power-assert", function() {
  return gulp.src('app/compiled-tests/**/*.js')
             .pipe(espower())
             .pipe(gulp.dest('app/powered-tests'));
});

gulp.task("power-assert-remote", function() {
  return browserify('./app/compiled-tests/tests/index.js', {
      debug:true,
    })
   .transform([nodeUnderscorify, espowerify])
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('app/powered-tests'));
});


gulp.task('compile-test', function(){
  //var tsResult = gulp.src([
  return _compileTest([
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsMain,
  ]);
});

gulp.task('compile-test-local', function(){
  //var tsResult = gulp.src([
  return _compileTest([
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsMain,
    '!app/typescripts/tests/**/*ViewTest.ts',
    '!app/typescripts/itemviews/**/*.ts',
    '!app/typescripts/collectionviews/**/*.ts',
    '!app/typescripts/compositeviews/**/*.ts',
    '!app/typescripts/layoutviews/**/*.ts',
    '!app/typescripts/tests/index.ts',
  ]);
});

function _compileTest (paths) {
  var tsResult = gulp.src(paths)
        .pipe(sourcemaps.init())
        .pipe(ts({
          sortOutput: true,
          declarationFiles:  true,
          module:'commonjs',
          target:'ES5',
          noImplicitAny:true,
          //noExternalResolve: true
        }));
  return eventStream.merge(
    tsResult.dts.pipe(gulp.dest('app/dts')),
    tsResult.js.pipe( sourcemaps.write() )
               .pipe( gulp.dest('app/compiled-tests') )
  );
}


gulp.task("_test:local", function(){
  return gulp.src('app/powered-tests/tests/**/*.js', {read: false })
      .pipe(mocha({ reporter: 'spec' }))
      .on('error', handleError);
});

gulp.task("test:local", function(){
  runSequence('clean:test', 'compile-test-local', 'power-assert', '_test:local');
});

gulp.task('_test:remote', function(done){
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);
});

gulp.task('test:remote', function(done){
  runSequence('clean:test', 'compile-test', /*'power-assert-remote',*/ '_test:remote');
});

gulp.task('_test:phantom', function(done){
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: true
  }, function(){})
});

gulp.task('test:phantom', function(done){
  runSequence('clean:test', 'compile-test', /*'power-assert-remote',*/ '_test:phantom');
});

var template = require('./gulptasks/template')(gulp);
var clean = require('./gulptasks/clean')(gulp);
var sass = require('./gulptasks/sass')(gulp);
var doc = require('./gulptasks/doc')(gulp, path);
var server = require('./gulptasks/server')(gulp);
var hello = require('./gulptasks/hello')(gulp);
var nyamazing = require('./gulptasks/nyamazing')(gulp);

