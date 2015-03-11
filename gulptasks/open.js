"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var os   = require('os');
  var open = require('gulp-open');
  var __   = require('underscore');

  const osType = [
    {name:'Linux',      alt: new Set(['linux', 'ubuntu', 'centos'])},
    {name:'Darwin',     alt: new Set(['mac', 'osx', 'os x'])},
    {name:'Windows_NT', alt: new Set(['windows', 'win'])},
  ];
  const wbType = [
    {alt:new Set(['g', 'google', 'chrome', 'google-chrome']), type:{
      Linux:      'chromium-browser',
      Darwin:     'google chrome',
      Windows_NT: 'chrome',
    }},
    {alt:new Set(['f', 'firefox', 'fx', 'mozilla']), type:{
      Linux:      'firefox',
      Darwin:     'firefox',
      Windows_NT: 'firefox',
    }},
    {alt:new Set(['s', 'safari']), type:{
      Linux:      'safari',
      Darwin:     'safari',
      Windows_NT: 'safari',
    }}];

  gulp.task('open', function(){
    const currentOS = personal.os || 'auto';
    const currentOSs = osType.filter(function(o){
      return o.alt.has(currentOS.toLowerCase());
    }).map(function(o){
      return o.name;
    });
    const currentOS2 = currentOSs.length === 0 ? os.type()
                   : currentOSs[0] === 'auto'? os.type()
                                             : currentOSs[0];

    const currentWB = personal.webBrowser || 'auto';
    const currentWBs = wbType.filter(function(b){
      return b.alt.has(currentWB.toLowerCase());
    }).map(function(b){
      return b.type[currentOS2];
    });
    const currentWB2 = currentWBs.length === 0 ? wbType[0].type[currentOS2]
                     : currentWBs[0] === 'auto'? wbType[0].type[currentOS2]
                                               : currentWBs[0];

    console.log(currentOS2);
    console.log(currentWB2);

    let port = "auto";
    if ( personal.port != undefined ){
      port = personal.port;
    }
    if( port === 'auto' ){
      port = 4649;
    }

    gulp.src('app/index.html')
        .pipe(open('',{app: currentWB2, url: 'http://localhost:'+port+'/' }));
  });
};


