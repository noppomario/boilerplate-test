// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp, path){
  'use strict';

  // Gulp Utils
  const eventStream = require('event-stream');
  const runSequence = require('run-sequence');
  const source      = require('vinyl-source-stream');

  // Module
  const browserify = require('browserify');
  const nodeUnderscorify = require('node-underscorify');

  // Test
  const karma = require('karma').server;
  const mocha = require("gulp-mocha");
  const espower = require("gulp-espower");
  const ts =    require("gulp-typescript");
  const sourcemaps  = require('gulp-sourcemaps');
  const espowerify  = require('espowerify');
  //const plumber     = require('gulp-plumber');

  function handleError(err){
    console.log(err.toString());
    this.emit('end');
  }

  function _compileTest (paths) {
    const tsResult = gulp.src(paths)
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
      '!app/typescripts/routers/**/*.ts',
    ]);
  });

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
      configFile: __dirname + '/../karma.conf.js',
      singleRun: false
    }, done);
  });

  gulp.task('test:remote', function(done){
    runSequence('clean:test', 'compile-test', /*'power-assert-remote',*/ '_test:remote');
  });

  gulp.task('_test:phantom', function(done){
    return karma.start({
      configFile: __dirname + '/../karma.conf.js',
      browsers: ['PhantomJS'],
      singleRun: true
    }, function(){})
  });

  gulp.task('test:phantom', function(done){
    runSequence('clean:test', 'compile-test', /*'power-assert-remote',*/ '_test:phantom');
  });

};

