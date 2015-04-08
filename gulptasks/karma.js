
module.exports = function(browsers,isSingleRun){
  'use strict';
  const karma = require('karma').server;
  return karma.start({
    configFile: __dirname + '/../karma.conf.js',
    browsers: browsers,
    singleRun: isSingleRun
  }, function(){});
};

