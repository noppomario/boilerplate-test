'use strict';

var path    = require('path');
var webpack = require('webpack');
var fs = require('fs');
module.exports = {
  devtool: 'sourcemap',
//  entry: './app/compiled-tests/app.js',
  entry: function(){
    var files = fs.readdirSync('./app/typescripts/tests');
    var obj = {}
    files.forEach(function(file){
      let value = './app/typescripts/tests/'+file;
      let key   = path.basename(file,'.ts');
      obj[key] = value;
    });
    return obj;
  }()
    //'./app/typescripts/tests/UserTest.ts'
  ,
  output: {
    path: './app/compiled-tests/',//__dirname,
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
      { test: /\.ts$/, loader: 'ts-loader?sourceMap&target=ES5&noImplicitAny' },
      //{ test: /\.js$/, loader: 'webpack-espower-loader' },
    ]
  },
  externals: {
      'jquery':     '$',
      'backbone':   'Backbone',
      'marionette': 'Marionette',
  },
  plugins: [
  ]
};
