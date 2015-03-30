
module.exports = function(gulp, path, argv){
  'use strict';

  const watch = require('gulp-watch');
  const browserSync = require('browser-sync');

  if( argv.indexOf('ts') !== -1 ){
    console.log('watch: typescript files');
    watch(path.tsFiles, function(){
      gulp.start(['compile-all']);
      browserSync.reload();
    });
  }
};
