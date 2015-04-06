
module.exports = function(gulp, personal, type){
  'use strict';

  const os   = require('os');
  const open = require('gulp-open');

  const osTypes = new Set(['Linux', 'Darwin', 'Windows_NT']);
  const defaultWebBrowser = {
    'Linux'     : 'chromium-browser',
    'Darwin'    : 'safari',
    'Windows_NT': 'firefox',
  };


  const osType =
      osTypes.has(personal.os) ? personal.os
			       : os.type();

  const webBrowser =
      personal.webBrowser === 'auto'   ? defaultWebBrowser[osType]
    : personal.webBrowser != undefined ? personal.webBrowser
				       : defaultWebBrowser[osType];

  console.log(osType);
  console.log(webBrowser);

  const port =
      personal.proxyPort === 'auto'   ? 4650
    : personal.proxyPort != undefined ? personal.proxyPort
				      : 4650;

  const urls = {
    app: 'http://localhost:'+port+'/',
    doc: 'docs/index.html',
    coverage: 'coverage/',
  };

  if ( urls[type] == undefined ){
    process.exit(1);
  }

  gulp.src('app/index.html')
    .pipe(open('',{
      app: webBrowser,
      url: urls[type],
    }));

};


