
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS } = require('../handler.js');
console.log(PATHS);

const host = 'localhost';
const port = 8080;

module.exports = {
  mode: "development",
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
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    mergeDuplicateChunks: false,
    providedExports: false,
    runtimeChunk: false,
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: "babel-loader"
        }, {
          loader: "ts-loader"
        }],
        exclude: [PATHS.node_modules]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [PATHS.node_modules]
      },
    ]
  },
  devServer: {
    contentBase: PATHS.dist,
    historyApiFallback: true,
    stats: {
      assets: false,
      colors: true,
      warnings: true,
    },
    host,
    port,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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