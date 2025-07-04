const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert/"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "url": require.resolve("url/"),
    "buffer": require.resolve("buffer/"),
    "util": require.resolve("util/"),
    "process": require.resolve("process/browser"),
    "vm": require.resolve("vm-browserify"),
    "events": require.resolve("events/"),
    "path": require.resolve("path-browserify")
  };

  config.resolve.fallback = fallback;
  
  // Add environment definitions
  const definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'globalThis': 'window',
  });

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
    definePlugin
  ]);

  // Ensure proper environment for BigInt
  config.resolve.alias = {
    ...config.resolve.alias,
    'process': 'process/browser'
  };
  
  return config;
}; 