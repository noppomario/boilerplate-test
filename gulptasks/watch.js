
module.exports = function(gulp, path, argv){
  'use strict';

  const watch = require('gulp-watch');
//  const browserSync = require('browser-sync');


  if( argv.indexOf('ts') !== -1 ){
    console.log('watch: typescript files');
    watch([path.tsFiles,path.templateFiles], function(){
      gulp.start(['compile-all']);
//      browserSync.reload();
    });
  }

  if( argv.indexOf('sass') !== -1 ){
    console.log('watch: sass files');
    watch([path.sassFiles], function(){
      gulp.start(['sass']);
    });
  }
};
