import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mount from "koa-mount";
import serve from "koa-static";
import { devMiddleware, hotMiddleware } from "koa-webpack-middleware";
import path from "path";
import webpack from "webpack";
import routeMiddleware from "./routes";
import serverMiddleware from "./server";
import serverSources from "./sources/";
import SourceContainer from "../common/sources";
import webpackConfig from "../webpack.config";

serverSources(SourceContainer);

const app = new Koa(),
    compiler = webpack(webpackConfig);

// Webpack hot reload middleware
if (process.env.NODE_ENV !== "production") {
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(hotMiddleware(compiler));
}

// Static assets middleware
app.use(mount(webpackConfig.output.publicPath, serve(webpackConfig.output.path)));
app.use(mount("/assets", serve(path.join(__dirname, "..", "assets"))));

// Body parsing middleware
app.use(bodyParser());

// API routes middleware
app
  .use(routeMiddleware.routes())
  .use(routeMiddleware.allowedMethods());

// React server middleware
app.use(serverMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port", process.env.PORT || 3000);
});
