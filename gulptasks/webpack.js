
module.exports = function(gulp, path){
  'use strict';

  const webpack = require('gulp-webpack');
  const myConfig = require('../webpack.config');

  return gulp.src('./app/compiled-tests/app.js')
    .pipe(webpack(myConfig))
    .pipe(gulp.dest('./app/scripts/'));

};

