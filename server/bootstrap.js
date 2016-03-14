import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config";
import serverMiddleware from "./server";

let app = express(),
    compiler = webpack(webpackConfig);

// Webpack middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// Static assets middleware
app.use("/assets/static", express.static(path.join(__dirname, "..", "build")));
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// Server middleware
app.use(serverMiddleware);

// example of handling 404 pages
app.get("*", function(req, res) {
  res.sendStatus(404);
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request", req.method, req.url);
  console.error(err.stack);

  res.sendStatus(500);
});

process.on("uncaughtException", evt => {
  console.log("uncaughtException: ", evt);
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on port", process.env.PORT || 3000);
});
