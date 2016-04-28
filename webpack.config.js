"use strict";

var path = require("path"),
    webpack = require("webpack");

module.exports = {
  devtool: "#inline-source-map",
  entry: [
    "'eventsource-polyfill",
    "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
    "./client/index.js"
  ],

  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/assets/static/"
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  resolve: {
    alias: {},
    extensions: ["", ".js", ".jsx"]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        exclude: /node_modules/,
        include: __dirname,
        query: {
          env: {
            development: {
              presets: ['react-hmre']
            }
          },
          presets: [
            "es2015",
            "stage-2",
            "react"
          ],
          plugins: [
            "transform-decorators-legacy"
          ],
        }
      },
      {
        test: /\.css$/,
        loader: "style!css",
      },
    ]
  }
};
