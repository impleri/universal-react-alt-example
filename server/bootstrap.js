import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mount from "koa-mount";
import serve from "koa-static";
import { devMiddleware, hotMiddleware } from "koa-webpack-middleware";
import path from "path";
import webpack from "webpack";
import "./sources/";
import routeMiddleware from "./routes";
import serverMiddleware from "./server";
import Config from "../common/utils/config";
import webpackConfig from "../webpack.config";

const app = new Koa(),
    compiler = webpack(webpackConfig);

// Webpack middleware
if (Config.get("NODE_ENV") === "production") {
  app.use(mount(webpackConfig.output.publicPath, serve(webpackConfig.output.path)));
} else {
  app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(hotMiddleware(compiler));
}

// Static assets middleware
app.use(mount("/assets", serve(path.join(__dirname, "..", "assets"))));

// Body parsing middleware
app.use(bodyParser());

// API routes middleware
app
  .use(routeMiddleware.routes())
  .use(routeMiddleware.allowedMethods());

// React server middleware
app.use(serverMiddleware);

const port = Config.get("APP_PORT", 3000);

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});
