
module.exports = function(gulp, path){
  'use strict';

//  const source     = require('vinyl-source-stream');
//  const browserify = require('browserify');
//  const nodeUnderscorify = require('node-underscorify');

  const plumber = require('gulp-plumber');
  const handleErrors = require('./handleErrors');

  const eventStream = require('event-stream');
  const ts =    require("gulp-typescript");
  const sourcemaps  = require('gulp-sourcemaps');

  var tsResult = gulp.src(path.tsFiles)
    .pipe(sourcemaps.init())
    .pipe(ts({
      sortOutput: true,
      declarationFiles:  true,
      module:'commonjs',
      target:'ES5',
      noImplicitAny:true,
      //noExternalResolve: true
    })).on('error', handleErrors);

  return eventStream.merge(
    tsResult.dts.pipe(gulp.dest('app/dts')),
    tsResult.js.pipe( sourcemaps.write() )
      .pipe( gulp.dest('app/compiled-tests') )
  );

/*
  return browserify('./'+path.tsMain, {
      debug:true,
    })
   .transform([nodeUnderscorify,{extensions: ["ejs"]}])
   .plugin('tsify', {
     noImplicitAny: true,
     target: 'ES5',
   })
    .bundle()
    .on('error', handleErrors)
    .pipe(source('index.js'))
    .pipe(gulp.dest(path.jsDir));
*/

};

