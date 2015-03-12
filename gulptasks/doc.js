// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp, path){
  'use strict';

  const typedoc     = require('gulp-typedoc');

  const docTarget = [
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsTests,
  ];
  
  gulp.task('typedoc', function() {
    return gulp.src(docTarget)
      .pipe(typedoc({
        module: 'commonjs',
        out: './docs',
        name: project.name,
        target: 'es5'
      }));
  });

};
