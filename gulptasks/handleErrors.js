
module.exports = function(){
  'use strict';

  const notify  = require('gulp-notify');

  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
  }).apply(this, args);

  this.emit('end');
};
