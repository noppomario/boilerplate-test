'use strict';

// Project Information
const project = require('./package.json');
const personal = require('./personalSettings.json');

// Gulp Utils
const gulp = require("gulp");
const gutil = require("gulp-util");

const path = {
  tsFiles:  'app/typescripts/**/*.ts',
  dtsFiles: 'app/typescripts/typings/**/*.ts',
  tsTests:  'app/typescripts/tests/**/*.ts',
  tsMain:   'app/typescripts/app.ts',
  jsDir:    'app/scripts',
};

const build = require('./gulptasks/build')(gulp, path);
const test  = require('./gulptasks/test')(gulp, path);
const lint  = require('./gulptasks/lint')(gulp, path);
const open  = require('./gulptasks/open')(gulp);
const template = require('./gulptasks/template')(gulp);
const clean = require('./gulptasks/clean')(gulp);
const sass = require('./gulptasks/sass')(gulp);
const doc = require('./gulptasks/doc')(gulp, path);
const server = require('./gulptasks/server')(gulp);
const hello = require('./gulptasks/hello')(gulp);
const nyamazing = require('./gulptasks/nyamazing')(gulp);

