const path = require('path');

// root path
const root = path.join(__dirname, '../');

const PATHS = {
  root,
  src: path.join(root, 'src'),
  index: path.join(root, 'src/index.ts'),
  node_modules: path.join(root, 'node_modules'),
  dist: path.join(root, 'dist'),
  types: path.join(root, 'src/api/schemas/gql'),
};


module.exports = {
  PATHS
}