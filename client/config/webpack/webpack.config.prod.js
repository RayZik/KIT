module.exports = {
  mode: "production",
  optimization: {
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    providedExports: true,
    runtimeChunk: true,
    minimize: true,
  },
}