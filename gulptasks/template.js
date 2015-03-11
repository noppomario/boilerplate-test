"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var rename = require('gulp-rename');

  var template    = require('gulp-template');
  var conflict    = require('gulp-conflict');
  var fs          = require('fs');
  var inflection  = require('inflection');
  var __          = require('underscore');

  const templateOptions = {
    'interpolate': /\/\/<%=([\s\S]+?)%>/g,
    //  'evaluate': /{{([\s\S]+?)}}/g
  };

  const templateRules = {
    'model'         : {rule:     'singular'     , path: 'models',
                       template: 'model'     , prefix: ''
                       },
    'collection'    : {rule:     'plural'       , path: 'collections',
                       template: 'collection', prefix: '',
                       router: true, server: true },
    'itemView'      : {rule:     'singular'     , path: 'itemviews',
                       template: 'itemview'  , prefix: 'View',
                       html: true,  css: true  },
    'collectionView': {rule:     'plural'       , path: 'collectionviews',
                       template: 'collectionview', prefix: 'View',
                       },
    'compositeView' : {rule:     'plural'       , path: 'compositeviews',
                       template: 'compositeview', prefix: 'View',
                       html: true,  css: true  },
    'layoutView'    : {rule:     'origin'       , path: 'layoutviews',
                       template: 'layoutview'   , prefix: 'LayoutView',
                       html: true },
  };
  const tr = templateRules;

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
    var routerdir  = 'app/typescripts/routers';
    var routerpath = [routerdir, '/', outname, 'Router.ts'].join('');
    var serverdir  = 'server';
    var serverpath = [serverdir, '/', outname, '.js'].join('');

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
    if( type.router ){
      fs.exists(routerpath, function(exists){
        if(exists){
          console.log(outname+'Router.ts already exists.');
        } else {
          gulp.src('template/router.ts')
            .pipe(template({name: name,names: names}))
            .pipe(rename({
              basename: outname,
              extname:  'Router.ts'
            }))
            .pipe(gulp.dest(routerdir));
          console.log('create ' + routerpath);
        }
      });
    }
    if( type.server ){
      fs.exists(serverpath, function(exists){
        if(exists){
          console.log(outname+'.js already exists.');
        } else {
          gulp.src('template/serverRouter.js')
            .pipe(template({name: name,names: names}))
            .pipe(rename({
              basename: outname,
              extname:  '.js'
            }))
            .pipe(gulp.dest(serverdir));
          console.log('create ' + serverpath);
        }
      });
    }
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

};
