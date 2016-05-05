"use strict";

var path = require("path"),
    webpack = require("webpack"),
    production = {
        devtool: "#hidden-source-map",
        entry: ["eventsource-polyfill"],
        plugins: [
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
          })
        ]
    },
    development = {
      devtool: "#cheap-inline-source-map",
      entry: production.entry.concat(["webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",]),
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    },
    config = (process.env.NODE_ENV === "production") ? production : development;

module.exports = {
  devtool: config.devtool,
  entry: config.entry.concat(["./client/index.js"]),
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/assets/static/"
  },
  plugins: config.plugins,
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
