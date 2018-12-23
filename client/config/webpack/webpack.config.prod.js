module.exports = {
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    runtimeChunk: true,
    minimize: true,
  },
}