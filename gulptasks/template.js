
module.exports = function(gulp, argv){
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
  const htmlOptions   = { ext: '.ejs', dir: 'app/templates', dirType: 'name', source: 'template/view' };
  const routerOptions = { ext: '.ts',   dir: 'app/typescripts/routers', dirType: 'name', source: 'template/router', suffix: 'Router' };
  const serverOptions = { ext: '.js',   dir: 'server', source: 'template/serverRouter' };
  const testOptions   = { ext: '.ts',   dir: 'app/typescripts/tests', suffix: 'Test' };
  const cssOptions    = { ext: '.scss', dir: 'app/scss', prefix: '_' };

  const templateRules = {
    'model' : {
      ts: { ext: '.ts', dir: 'app/typescripts/models', dirType: 'name', source: 'template/model'},
      test: __.extend({}, testOptions, {source: 'template/modelTest'}),
      rule: 'singular', prefix: ''
    },
    'collection' : {
      ts: { ext: '.ts', dir: 'app/typescripts/collections', dirType: 'name', source: 'template/collection'},
      test: __.extend({}, testOptions, {source: 'template/collectionTest'}),
      router: routerOptions,
      server: serverOptions,
      rule: 'plural', prefix: '',
    },
    'pageableCollection' : {
      ts: { ext: '.ts', dir: 'app/typescripts/collections', dirType: 'name', source: 'template/pageableCollection'},
      test: __.extend({}, testOptions, {source: 'template/pageableCollectionTest'}),
      router: routerOptions,
      server: serverOptions,
      rule: 'plural', prefix: '',
    },
    'itemView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/itemviews', dirType: 'name', source: 'template/itemview'},
      test: __.extend({}, testOptions, {source: 'template/itemviewTest'}),
      html: htmlOptions,
      css: __.extend({}, cssOptions, {source: 'template/itemview'}),
      rule: 'singular', prefix: 'View',
    },
    'collectionView': {
      ts: { ext: '.ts', dir: 'app/typescripts/collectionviews', dirType: 'name', source: 'template/collectionview'},
      test: __.extend({}, testOptions, {source: 'template/collectionviewTest'}),
      rule: 'plural', prefix: 'View',
    },
    'compositeView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/compositeviews', dirType: 'name', source: 'template/compositeview'},
      test: __.extend({}, testOptions, {source: 'template/compositeviewTest'}),
      html: htmlOptions,
      css: __.extend({}, cssOptions, {source: 'template/compositeview'}),
      rule: 'plural', prefix: 'View',
     },
    'layoutView' : {
      ts: { ext: '.ts', dir: 'app/typescripts/layoutviews', source: 'template/layoutview'},
      test: __.extend({}, testOptions, {source: 'template/layoutviewTest'}),
      html: __.extend({}, htmlOptions, {dir: 'app/typescripts/layoutviews', dirType: ''}),
      rule: 'origin', prefix: 'LayoutView',
    },
  };
  const tr = templateRules;

  const ff = function(errEnd, options, outname, replaces){
    const prefix = options.prefix || '';
    const suffix = options.suffix || '';
    const name   = prefix + outname + suffix;
    const ext    = options.ext;
    const dir    = options.dirType ? 'app/typescripts/'+replaces.low : options.dir;
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
    const low =   name.replace(/^./,function(e){ return e.toLowerCase(); });
    const lows = names.replace(/^./,function(e){ return e.toLowerCase(); });
    const replaces = {name: name, names: names, low: low, lows: lows};

    ['ts', 'html', 'css', 'router', 'server', 'test' ].forEach(function(t){
      if(! type[t]) return;
      const e = t === 'ts' ? errEnd
                           : false;
      ff(e, type[t], outname, replaces);
    });
  };

  const t = {
    model:         function(name, paging, err){
      makeTemplate(tr.model,    name, err);
    },
    itemView:      function(name, paging, err){
      makeTemplate(tr.itemView, name, err);
      t.model(name, paging, false);
    },
    collection:    function(name, paging, err){
      if (paging) {
        makeTemplate(tr.pageableCollection, name, err);
      } else {
        makeTemplate(tr.collection, name, err);
      }
      t.model(name, paging, false);
    },
    collectionView: function(name, paging, err){
      makeTemplate(tr.collectionView, name, err);
      t.itemView(name, paging, false);
      t.collection(name, paging, false);
    },
    compositeView: function(name, paging, err){
      makeTemplate(tr.compositeView, name, err);
      t.itemView(name, paging, false);
      t.collection(name, paging, false);
    },
    layoutView:    function(name, paging, err){
      makeTemplate(tr.layoutView, name, err);
    },
  };

  const templateType = {
    'm'     : t.model,
    'model' : t.model,
    'v'        : t.itemView,
    'iv'       : t.itemView,
    'view'     : t.itemView,
    'itemview' : t.itemView,
    'c'          : t.collection,
    'collection' : t.collection,
    'collectionview': t.collectionView,
    'cv':             t.compositeView,
    'compositeview':  t.compositeView,
    'l':          t.layoutView,
    'layout':     t.layoutView,
    'layoutview': t.layoutView,
  };


  if ( argv.length < 2 ){
    console.log('too short options');
    process.exit(1);
  }

  const options = __(argv).reject(function(o){
    return o === 'paging';
  });

  const paging = ! (argv.length === options.length);

  if(templateType[options[0]]) {
    templateType[options[0]](options[1], paging, true);
  }

};
