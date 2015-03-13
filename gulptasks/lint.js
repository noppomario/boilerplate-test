// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp, path){
  'use strict';

  const tslint       = require('gulp-tslint');
  const tslintConfig = require('../tslint.json');

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

};
