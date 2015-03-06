"use strict";

// Project Information
var project = require('./package.json');

// Gulp Utils
var gulp = require("gulp");
var gutil = require("gulp-util");
var rename = require('gulp-rename');
var eventStream = require('event-stream');
var runSequence = require('run-sequence');
var source      = require('vinyl-source-stream');

// Module
var browserify = require('browserify');
var nodeUnderscorify = require('node-underscorify');

// Sass
var sass = require('gulp-sass');

// Template
var template    = require('gulp-template');
var conflict    = require('gulp-conflict');
var fs          = require('fs');
var inflection  = require('inflection');
var __          = require('underscore');

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

// Documents
var typedoc     = require('gulp-typedoc');

// Cleaner
var clean       = require('gulp-clean');


var path = {
  tsFiles:  'app/typescripts/**/*.ts',
  dtsFiles: 'app/typescripts/typings/**/*.ts',
  tsTests:  'app/typescripts/tests/**/*.ts',
  tsMain:   'app/typescripts/app.ts',
  jsDir:    'app/scripts',
};


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


gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('app/styles'));
});

var templateOptions = {
  'interpolate': /\/\/<%=([\s\S]+?)%>/g,
//  'evaluate': /{{([\s\S]+?)}}/g
};


var templateRules = {
  'model'         : {rule:     'singular'     , path: 'models',
                     template: 'model'     , prefix: '',
                     html: false, css: false },
  'collection'    : {rule:     'plural'       , path: 'collections',
                     template: 'collection', prefix: '',
                     html: false, css: false },
  'itemView'      : {rule:     'singular'     , path: 'itemviews',
                     template: 'itemview'  , prefix: 'View',
                     html: true,  css: true  },
  'collectionView': {rule:     'plural'       , path: 'collectionviews',
                     template: 'collectionview', prefix: 'View',
                     html: false, css: false },
  'compositeView' : {rule:     'plural'       , path: 'compositeviews',
                     template: 'compositeview', prefix: 'View',
                     html: true,  css: true  },
  'layoutView'    : {rule:     'origin'       , path: 'layoutviews',
                     template: 'layoutview'   , prefix: 'LayoutView',
                     html: true,  css: false },
};
var tr = templateRules;

function makeTemplate(type,_name,errEnd){
  var outname;
  var __name = inflection.camelize(_name);
  var name  = inflection.singularize(__name);
  var names = inflection.pluralize(__name);
  if( type.rule === 'singular' ){
    outname = name  + type.prefix;
  } else if ( type.rule === 'plural' ){
    outname = names + type.prefix;
  } else if ( type.rule === 'origin' ){
    name    = __name;
    names   = __name;
    outname = __name + type.prefix;
  }
  var tsdir = 'app/typescripts/' + type.path;
  var tspath   = [tsdir, '/', outname, '.ts'  ].join('');
  var htmldir  = 'app/templates';
  var htmlpath = [htmldir, '/', outname, '.html'].join('');
  var testdir  = 'app/typescripts/tests';
  var testpath = [testdir, '/', outname, 'Test.ts' ].join('');
  var cssdir   = 'app/scss';
  var csspath  = [cssdir, '/_', outname, '.scss' ].join('');

  fs.exists(tspath, function(exists){
    if(exists && errEnd){
      throw outname+'.ts already exists.';
    } else if (exists) {
      console.log(outname+'.ts already exists.');      
    } else {
      gulp.src('template/'+type.template+'.ts')
        .pipe(template({name: name,names: names}))
        .pipe(rename({
          basename: outname,
          extname:  '.ts'
        }))
        .pipe(gulp.dest(tsdir));
      console.log('create ' + tspath);
    }
  });
  if( type.html ){
    fs.exists(htmlpath, function(exists){
      if(exists){
        console.log(outname+'.html already exists.');
      } else {
        gulp.src('template/view.html')
          .pipe(rename({
            basename: outname,
            extname:  '.html'
          }))
          .pipe(gulp.dest(htmldir));
        console.log('create ' + htmlpath);
      }
    });
  }
  if( type.css ){
    fs.exists(csspath, function(exists){
      if(exists){
        console.log('_'+outname+'.scss already exists.');
      } else {
        gulp.src('template/'+type.template+'.scss')
          .pipe(template({name: name,names: names}))
          .pipe(rename({
            basename: '_'+outname,
            extname: '.scss'
          }))
          .pipe(gulp.dest(cssdir));
        console.log('create ' + csspath);
      }
    });
  }
/* umaku ikanai
    let importStr;
    if(type.rule === 'singular'){
      importStr = '@import "'+name+'View";\n//<%= name %>';
    } else {
      importStr = '@import "'+names+'View";\n//<%= name %>';
    }
    fs.exists('app/scss/index.scss', function(exists){
      if(exists){
        gulp.src('app/scss/index.scss')
          .pipe(template({name: importStr},templateOptions))
          .pipe(gulp.dest('app/scss')); 
      }
    });
*/
//  if( type.path === 'models' || type.path === 'collections'
//   || type.path === 'itemviews' || type.path === 'compositeviews' ) {
    fs.exists(testpath, function(exists){
      if(exists){
        console.log(outname+'Test.ts already exists.');
      } else {
        gulp.src('template/'+type.template+'Test.ts')
          .pipe(template({name: name,names: names}))
          .pipe(rename({
            basename: outname+'Test',
            extname:  '.ts'
          }))
          .pipe(gulp.dest(testdir));
        console.log('create ' + testpath);
      }
    });
//  }
};

gulp.task('templateModel', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.model, err: true},
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});

gulp.task('templateItemView', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.itemView, err: true},
    {type: tr.model,    err: false}
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});

gulp.task('templateCollection', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.collection, err: true},
    {type: tr.model,      err: false}
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});

gulp.task('templateCollectionView', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.collectionView, err: true},
    {type: tr.collection,     err: false},
    {type: tr.itemView,       err: false},
    {type: tr.model,          err: false}
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});


gulp.task('templateCompositeView', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.compositeView, err: true},
    {type: tr.collection,    err:false},
    {type: tr.itemView,      err:false},
    {type: tr.model,         err:false}
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});

gulp.task('templateLayoutView', function(){
  var param = process.argv;
  if(param.length < 5){ throw 'dame desu yo'}
  var name = param[4];
  [
    {type: tr.layoutView, err: true},
  ].forEach(function(o){
    makeTemplate(o.type, name, o.err);
  });
});

gulp.task('typedoc', function() {
  return gulp.src([
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsTests,
    ])
    .pipe(typedoc({
      module: 'commonjs',
      out: './docs',
      name: project.name,
      target: 'es5'
    }));
});

gulp.task("clean", function(){
  return gulp.src(['app/compiled-tests', 'app/powered-tests', 'app/dts', 'app/scripts', 'app/styles']).pipe(clean());
});

gulp.task("clean:test", function(){
  return gulp.src(['app/compiled-tests', 'app/powered-tests', 'app/dts', 'app/scripts']).pipe(clean());
});

gulp.task('hello', function(){
  console.log( 'hello' );
});

gulp.task('nyamazing', function(){
  console.log( 'Nyamazing!' );
});

