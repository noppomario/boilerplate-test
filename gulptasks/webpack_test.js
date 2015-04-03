
module.exports = function(gulp, path){
  'use strict';

  const webpack = require('gulp-webpack');
  const myConfig = require('../webpack.test.config');

  return gulp.src('.app/typescripts/app.ts')
    .pipe(webpack(myConfig, null, done))
    .pipe(gulp.dest('./app/compiled-tests/'))

/*
  const karma = require('karma').server;
  return karma.start({
    configFile: __dirname + '/../karma.conf.js',
    browsers: ['PhantomJS'],
    singleRun: true
  }, function(){})
*/
};

function done (err, stats) {
  'use strict';

  const gutil = require('gulp-util');
  const options = require('../webpack.test.config');
  const notifier = require('node-notifier');

  if (options.quiet) return;

  if (options.verbose) {
    gutil.log(stats.toString({
      colors: true,
    }));
  } else {
    gutil.log(stats.toString({
      colors:       (options.stats && options.stats.colors)       || true,
      hash:         (options.stats && options.stats.hash)         || false,
      timings:      (options.stats && options.stats.timings)      || false,
      assets:       (options.stats && options.stats.assets)       || true,
      chunks:       (options.stats && options.stats.chunks)       || false,
      chunkModules: (options.stats && options.stats.chunkModules) || false,
      modules:      (options.stats && options.stats.modules)      || false,
      children:     (options.stats && options.stats.children)     || true,
    }));
  }

  if(err || (err = stats.compilation.errors[0])) {
    var name = err.name;
    var message = err.message;
    notifier.notify({
      title: name,
      message: message.replace(/\u001b\[[0-9]+m/g,'')
    });
  }
}

