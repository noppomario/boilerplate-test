"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){

  var os   = require('os');
  var open = require('gulp-open');

  const osType = {
    'linux':   'Linux',
    'ubuntu':  'Linux',
    'mac':     'Darwin',
    'osx':     'Darwin',
    'windows': 'Windows_NT',
    'win':     'Windows_NT',
  };

  gulp.task('open', function(){
    let currentOS = 'auto';
    if ( personal.os != undefined ){
      currentOS = osType[personal.os.toLowerCase()] || 'auto';
    }
    if ( currentOS === 'auto' ){
      currentOS = os.type();
    }

    console.log(currentOS);

    let currentWebBrowser = 'auto';
    if ( personal.webBrowser != undefined ){
      currentWebBrowser = personal.webBrowser;
    }

    let port = "auto";
    if ( personal.port != undefined ){
      port = personal.port;
    }
    if( port === 'auto' ){
      port = 4649;
    }

    if ( currentWebBrowser != 'auto' ){
      gulp.src('app/index.html')
        .pipe(open('',{app: currentWebBrowser, url: 'http://localhost:'+port+'/' }));
    } else {
      gulp.src('app/index.html')
        .pipe(open('',{app: 'chromium-browser', url: 'http://localhost:'+port+'/' }));
    }
/*
    if ( currentOS === 'Linux' ){
      gulp.src('app/index.html')
        .pipe(open('',{app: 'chromium-browser', url: 'http://localhost:4649/' }));
    } else if ( currentOS === 'Windows_NT' ){

    } else if ( currentOS === 'Darwin' ){

    }
*/
  });
};


