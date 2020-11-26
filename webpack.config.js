const path = require('path');
var webpack = require('webpack');

module.exports = {
  externals: {
    fs: require('fs'),
    path: require('path'),
  },
  mode: "development",
  entry: './layout/assets/js/main.js',
  output: {
    path: path.resolve(__dirname, 'layout/assets/js/_relations'),
    filename: 'knight.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  node: {
    global: true,
  }
  // target: 'node'
  // devServer: {
  //   contentBase: './dist',
  // },
  // devtool: 'inline-source-map',
  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /(node_modules|bower_components)/,
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // }
};