
module.exports = function(gulp, path, argv){
  'use strict';

  const watch = require('gulp-watch');

  const watcher = {
    ts: function(){
      console.log('watch: typescript files');
      watch([path.tsFiles,path.templateFiles], function(){
	gulp.start(['compile-all']);
      });
    },
    sass: function(){
      console.log('watch: sass files');
      watch([path.sassFiles], function(){
	gulp.start(['sass']);
      });
    },
  };

  const valid = Object.keys(watcher);

  const arr = argv.length === 0 ? valid
                                : argv;

  arr.filter(function(a){
    return valid.indexOf(a) !== -1;
  }).forEach(function(a){
    watcher[a]();
  });

};
