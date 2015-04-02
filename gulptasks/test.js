// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp, path){
  'use strict';

  function handleError(err){
    console.log(err.toString());
    this.emit('end');
    process.exit(1);
  }

  function _compileTest (paths) {
    const eventStream = require('event-stream');
    const ts =    require("gulp-typescript");
    const sourcemaps  = require('gulp-sourcemaps');

    const tsResult = gulp.src(paths)
	  .pipe(sourcemaps.init())
	  .pipe(ts({
	    sortOutput: true,
	    declarationFiles:  true,
	    module:'commonjs',
	    target:'ES5',
	    noImplicitAny:true,
	    //noExternalResolve: true
	  })).on('error', handleError);

    return eventStream.merge(
      tsResult.dts.pipe(gulp.dest('app/dts')),
      tsResult.js.pipe( sourcemaps.write() )
		 .pipe( gulp.dest('app/compiled-tests') )
    );
  }

  gulp.task("power-assert", function() {
    const espower = require("gulp-espower");

    return gulp.src('app/compiled-tests/**/*.js')
	       .pipe(espower())
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
      '!app/typescripts/**/*View.ts',
      '!app/typescripts/**/*Router.ts',
    ]);
  });

  gulp.task('_test:local', function(){
    const istanbul = require('gulp-istanbul');
    const mocha = require('gulp-mocha');
    const plumber = require('gulp-plumber');

    return gulp.src([
       'app/powered-tests/**/*.js',
      '!app/powered-tests/tests/**/*.js',
        ])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function(){
          gulp.src(['app/powered-tests/tests/**/*.js'])
            .pipe(plumber())
            .pipe(mocha())
            .pipe(istanbul.writeReports())
            .on('finish', function(){
              console.log('owatta yo');
            });
        });
  });

  gulp.task("test:local", function(){
    const runSequence = require('run-sequence');

    return runSequence('clean:test', 'compile-test-local', 'power-assert', '_test:local');
  });

  gulp.task('_test:remote', function(done){
    const karma = require('karma').server;

    return karma.start({
      configFile: __dirname + '/../karma.conf.js',
      singleRun: false
    }, done);
  });

  gulp.task('test:remote', function(done){
    const runSequence = require('run-sequence');

    return runSequence('clean:test', 'compile-test', '_test:remote');
  });

  gulp.task('_test:phantom', function(done){
    const karma = require('karma').server;

    return karma.start({
      configFile: __dirname + '/../karma.conf.js',
      browsers: ['PhantomJS'],
      singleRun: true
    }, function(){})
  });

  gulp.task('test:phantom', function(done){
    const runSequence = require('run-sequence');

    return runSequence('clean:test', 'compile-test', '_test:phantom');
  });

};

