const helper = require('./helper');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('copy-webpack-plugin');
const PATHS = helper.PATHS;



module.exports = {
  entry: PATHS.index,
  mode: "development",
  target: "node",
  externals: [nodeExternals()],
  module: {
    rules: [{
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: PATHS.node_modules
      }
    ]
  },
  resolve: {
    modules: [PATHS.src, PATHS.node_modules],
    extensions: ['.ts', '.js', '.gql']
  },
  output: {
    filename: 'index.js',
    path: PATHS.dist,
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: PATHS.types,
      to: path.resolve(PATHS.dist, 'gql')
    }]),
    new CleanPlugin([PATHS.dist], {
      root: PATHS.root,
      dry: false,
      verbose: true,
    }),
  ]
}