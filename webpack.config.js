var path    = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './app/compiled-tests/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    root: [path.join(__dirname, "app/libraries")],
  },
  module: {
    loaders: [
      { test: /\.ejs/, loader: 'underscore-template-loader' }
    ]
  },
  externals: {
      'jquery':     '$',
      'backbone':   'Backbone',
      'marionette': 'Marionette',
  },
  plugins: [
    //new webpack.ResolverPlugin(
    //  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"]),
    //),
    //new webpack.ProvidePlugin({
    //  jQuery: "jquery",
    //  $:      "jquery",
    //}),
  ]
};
