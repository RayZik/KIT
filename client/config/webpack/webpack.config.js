const merge = require('webpack-merge');

const COMMON_CFG = require('./webpack.config.common.js');
const PROD_CFG = require('./webpack.config.prod.js');
const DEV_CFG = require('./webpack.config.dev.js');


if (process.env.NODE_ENV === 'production') {
  module.exports = [merge(COMMON_CFG, PROD_CFG)];
} else {
  module.exports = [merge(COMMON_CFG, DEV_CFG)];
}