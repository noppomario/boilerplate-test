'use strict';

var path    = require('path');
var webpack = require('webpack');
var fs = require('fs');
module.exports = {
  devtool: 'inline-source-map',
  entry: function(){
    var files = fs.readdirSync('./app/typescripts/tests');
    var obj = {}
    files.forEach(function(file){
      let value = './app/typescripts/tests/'+file;
      let key   = path.basename(file,'.ts');
      obj[key] = value;
    });
    return obj;
  }(),
  output: {
    path: __dirname,
    filename: "[name].bundle.js",
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.ts'],
    root: [path.join(__dirname, "app/compiled-tests")],
  },
  module: {
    loaders: [
      { test: /\.ejs/, loader: 'underscore-template-loader' },
      { test: /\.ts$/, loader: 'webpack-espower!ts?sourceMap&target=ES5&noImplicitAny' },
    ]
  },
  externals: {
      'jquery':       '$',
      'backbone':     'Backbone',
      'marionette':   'Marionette',
      'power-assert': 'assert',
  },
  plugins: [
  ]
};
