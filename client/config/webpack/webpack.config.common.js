
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { PATHS } = require('../handler.js');
const isDevMode = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  context: PATHS.root,
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
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         minimize: !isDevMode
      //       }
      //     }]
      // },
      {
        test: /\.css$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: !isDevMode
            }
          }],
        include: PATHS.assets
      },
      {
        test: /\.css$/,
        exclude: PATHS.assets,
        use: [{
          loader: "raw-loader"
        }]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.public, 'index.html'),
      chunksSortMode: 'none',
      hash: false,
      inject: true,
      favicon: false,
      minify: false,
      cache: true,
    }),
  ],
}