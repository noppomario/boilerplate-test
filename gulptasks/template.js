// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp){
  'use strict';

  const rename = require('gulp-rename');
  const template    = require('gulp-template');
  const conflict    = require('gulp-conflict');
  const fs          = require('fs');
  const inflection  = require('inflection');
  const __          = require('underscore');

  const templateOptions = {
    'interpolate': /\/\/<%=([\s\S]+?)%>/g,
    //  'evaluate': /{{([\s\S]+?)}}/g
  };
  const htmlOptions   = { ext: '.html', dir: 'app/templates', source: 'template/view' };
  const routerOptions = { ext: '.ts',   dir: 'app/typescripts/routers', source: 'template/router', suffix: 'Router' };
  const serverOptions = { ext: '.js',   dir: 'server', source: 'template/serverRouter' };
  const testOptions   = { ext: '.ts',   dir: 'app/typescripts/tests', suffix: 'Test' };
  const cssOptions    = { ext: '.scss', dir: 'app/scss', prefix: '_' };

  const templateRules = {
    'model' : {
      ts: { ext: '.ts', dir: 'app/typescripts/models', source: 'template/model'},
      test: __.extend({}, testOptions, {source: 'template/modelTest'}),
      rule: 'singular', prefix: ''
    },
    'collection' : {
      ts: { ext: '.ts', dir: 'app/typescripts/collections', source: 'template/collection'},
      test: __.extend({}, testOptions, {source: 'template/collectionTest'}),
      router: routerOptions,
      server: serverOptions,
      rule: 'plural', prefix: '',
    },
    'itemView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/itemviews', source: 'template/itemview'},
      test: __.extend({}, testOptions, {source: 'template/itemviewTest'}),
      html: htmlOptions,
      css: __.extend({}, cssOptions, {source: 'template/itemview'}),
      rule: 'singular', prefix: 'View',
    },
    'collectionView': {
      ts: { ext: '.ts', dir: 'app/typescripts/collectionviews', source: 'template/collectionview'},
      test: __.extend({}, testOptions, {source: 'template/collectionviewTest'}),
      rule: 'plural', prefix: 'View',
    },
    'compositeView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/compositeviews', source: 'template/compositeview'},
      test: __.extend({}, testOptions, {source: 'template/compositeviewTest'}),
      html: htmlOptions,
      css: __.extend({}, cssOptions, {source: 'template/compositeview'}),
      rule: 'plural', prefix: 'View',
     },
    'layoutView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/layoutviews', source: 'template/layoutview'},
      test: __.extend({}, testOptions, {source: 'template/layoutviewTest'}),
      html: htmlOptions,
      rule: 'origin', prefix: 'LayoutView',
    },
  };
  const tr = templateRules;

  const ff = function(errEnd, options, outname, replaces){
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const name   = prefix + outname + suffix;
    const ext    = options.ext;
    const dir    = options.dir;
    const path   = [dir, '/', name, ext ].join('');
    const source = options.source + ext;
    fs.exists(path, function(exists){
      if(exists && errEnd){
        throw name + ext + ' already exists.';
      } else if (exists) {
        console.log(name + ext + ' already exists.');      
      } else {

        gulp.src(source)
          .pipe(template(replaces))
          .pipe(rename({basename: name, extname: ext}))
          .pipe(gulp.dest(dir));
        //f( source, replaces,
        //   {basename: name, extname: ext}, dir );
        console.log('create ' + path);
      }
    });
  };

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
    const replaces = {name: name, names: names};

    ['ts', 'html', 'css', 'router', 'server', 'test' ].forEach(function(t){
      if(! type[t]) return;
      const e = t === 'ts' ? errEnd
                           : false;
      ff(e, type[t], outname, replaces);
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
