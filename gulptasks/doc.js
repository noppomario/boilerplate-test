
module.exports = function(gulp, path, project){
  'use strict';

  const typedoc = require('gulp-typedoc');

  const docTarget = [
    path.tsFiles,
    '!'+path.dtsFiles,
    '!'+path.tsTests,
  ];
  
  return gulp.src(docTarget)
    .pipe(typedoc({
      module: 'commonjs',
      out: './docs',
      name: project.name,
      target: 'es5'
    }));

};
