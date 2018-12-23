
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { PATHS } = require('../handler.js');

const host = 'localhost';
const port = 8080;

module.exports = {
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    mergeDuplicateChunks: false,
    providedExports: false,
    runtimeChunk: false,
    minimize: false,
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
      template: path.join(PATHS.root, 'index.html'),
      chunksSortMode: 'none',
      hash: false,
      inject: true,
      favicon: false,
      minify: false,
      cache: true,
    }),
  ],
}