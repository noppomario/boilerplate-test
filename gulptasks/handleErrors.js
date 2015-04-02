
module.exports = function(){
  'use strict';

  const notify  = require('gulp-notify');

  var args = Array.prototype.slice.call(arguments);
  /*
  if (args[0].message != undefined){
    var q = args[0].message.replace(/\u001b\[[0-9]+m/g,'');
    args[0].message = q;
  }
  console.log(args[0]);

  console.log(Object.keys(args[0]));
  */
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>",
  }).apply(this, args);

  this.emit('end');
};
