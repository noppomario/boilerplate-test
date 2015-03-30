
module.exports = function(personal){
  'use strict';

  const cv = require('colorful-voice');

  const message = personal.message || 'hello!';
  cv.red(message).toConsole();

};
