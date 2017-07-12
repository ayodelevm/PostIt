const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, '/client/build'),
    port: 3000
  },
  devtool: 'cheap-module-eval-source-map',
  entry: path.join(__dirname, '/client/dev/js/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  output: {
    path: path.join(__dirname, '/client/build'),
    filename: 'js/bundle.min.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
