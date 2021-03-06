var path = require("path"),
    fs = require("fs"),
    webpack = require("webpack"),
    HappyPack = require("happypack"),
    DotEnv = require("dotenv-safe"),
    production = {
      devtool: "#hidden-cheap-source-map",
      entry: ["babel-polyfill", "todomvc-app-css/index.css"],
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
      entry: [
        "webpack-hot-middleware/client",
        "react-hot-loader/patch"
      ].concat(production.entry),
      plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ]
    },
    config = (process.env.NODE_ENV === "production") ? production : development;

config.plugins.push(new webpack.DefinePlugin({
  "process.env": JSON.stringify(DotEnv.parse(fs.readFileSync("./.env")))
}));

config.plugins.push(new HappyPack({
  id: "js",
  loaders: ["babel"],
  threads: 4
}));

config.plugins.push(new HappyPack({
  id: "css",
  loaders: ["style-loader", "css-loader"],
  threads: 2
}));

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
        loader: "happypack/loader?id=js",
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: "happypack/loader?id=css"
      }
    ]
  }
};
