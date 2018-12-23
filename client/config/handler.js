const path = require('path');
const root = path.join(__dirname, '../')
const PATHS = {
  root,
  src: path.join(root, 'src'),
  node_modules: path.join(root, 'node_modules'),
  entry: path.join(root, 'src/index.tsx'),
  public: path.join(root, 'public'),
  dist: path.join(root, 'dist'),
  assets: path.join(root, 'src/assets'),
}

module.exports = { PATHS };