var path    = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'sourcemap',
//  entry: './app/compiled-tests/app.js',
  entry: './app/typescripts/app.ts',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.ts'],
    root: [path.join(__dirname, "app/libraries")],
  },
  module: {
    loaders: [
      { test: /\.ejs/, loader: 'underscore-template-loader' },
      { test: /\.ts$/, loader: 'ts-loader?sourceMap&target=ES5&noImplicitAny' },
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
