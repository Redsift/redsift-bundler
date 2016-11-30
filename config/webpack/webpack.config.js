'use strict';

var webpack = require('webpack'),
  path = require('path');

module.exports = {
  // target: 'web',
  cache: true,
  // entry: {
  //   profile: './components/index',
  //   common: ['react', 'react-dom']
  // },
  // output: {
  //   library: 'lib',
  //   libraryTarget: 'umd'
  // },
  resolve: {
   root: [path.resolve('/Users/martin/projects/sched-sift')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ],
    // loaders: [{
    //   test: /\.jsx?$/,
    //   loaders: ['babel?presets[]=es2015,presets[]=stage-0,presets[]=react,plugins[]=transform-runtime,cacheDirectory'],
    //   // include: [
    //   //   path.join(__dirname, 'components')
    //   // ]
    // }],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devtool: 'source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
