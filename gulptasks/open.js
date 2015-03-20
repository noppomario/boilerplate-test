
module.exports = function(gulp, personal){
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
      personal.port === 'auto'   ? 4649
    : personal.port != undefined ? personal.port
				 : 4649;

  gulp.src('app/index.html')
    .pipe(open('',{
      app: webBrowser,
      url: 'http://localhost:'+port+'/'
    }));

};


