// Project Information
const project = require('../package.json');
const personal = require('../personalSettings.json');

module.exports = function(gulp){
  'use strict';

  gulp.task('hello', function(){
    const message = personal.message || 'hello';
    console.log( message );
  });

};
