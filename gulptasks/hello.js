"use strict";

// Project Information
var project = require('../package.json');
var personal = require('../personalSettings.json');

module.exports = function(gulp){
  gulp.task('hello', function(){
    const message = personal.message || 'hello';
    console.log( message );
  });
};
