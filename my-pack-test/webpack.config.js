const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        path.resolve(__dirname, 'loader', 'style-loader'),
        path.resolve(__dirname, 'loader', 'less-loader'),
      ]
    }]
  }
};