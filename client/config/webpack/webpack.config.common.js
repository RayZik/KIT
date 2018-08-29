
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS } = require('../handler.js');

module.exports = {
  context: PATHS.root,
  target: 'web',
  entry: PATHS.entry,
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [PATHS.src, PATHS.node_modules],
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
        exclude: [PATHS.node_modules]
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.public, 'index.html'),
      chunks: ['main'],
      chunksSortMode: 'none',
      hash: false,
      inject: true,
      favicon: false,
      minify: false,
      cache: true,
    }),
  ],
}