const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "buffer": require.resolve("buffer"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert"),
          "util": require.resolve("util"),
          "process": require.resolve("process/browser.js"),
          "vm": require.resolve("vm-browserify"),
          "events": require.resolve("events"),
          "path": require.resolve("path-browserify"),
          "url": require.resolve("url"),
          "os": require.resolve("os-browserify")
        }
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
        new webpack.DefinePlugin({
          global: 'globalThis',
        })
      ]
    }
  },
  eslint: {
    configure: {
      globals: {
        BigInt: 'readonly'
      },
      rules: {
        'no-new-func': 'warn',
        'no-unused-vars': 'warn',
        'no-unreachable': 'warn'
      }
    }
  }
}; 