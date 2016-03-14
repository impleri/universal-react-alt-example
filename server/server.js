import Iso from "iso";
import React from "react";
import { renderToString } from "react-dom/server";
import { Router, RouterContext, match } from "react-router";
import flux from "../common/flux";
import routes from "../common/routes";

function renderFullPage(content) {
  let title = process.env.APP_NAME || "Universal Alt/React Example",
      favicon = process.env.APP_ICON || "/assets/images/favicon.png",
      faviconType = process.env.APP_ICON_TYPE || "image/png",
      script = process.env.APP_CLIENT || "/assets/static/bundle.js",
      style = process.env.APP_STYLE || false;

  if (style) {
    style = `<link rel="stylesheet" href="${style}" />`
  }

  return `<!doctype html>
  <html lang="utf-8">
    <head>
      <title>${title}</title>
      <link rel="shortcut icon" type="${faviconType}" href="${favicon}" />
    </head>
    <body>
      <div id="app">${content}</div>
      <script src="${script}"></script>
    </body>
  </html>
  `
};

export default function middleware(req, res, next) {
  match({routes, location: req.url}, (error, redirect, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    }

    if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search);
    }

    if (renderProps == null) {
      return res.sendStatus(404);
    }

    try {
      const iso = new Iso(),
          initView = renderToString(<RouterContext {...renderProps} />);

      iso.add(initView, flux.flush());
      res.status(200).send(renderFullPage(iso.render()));
    } catch (err) {
      console.log(`server error: ${err}`);
      res.status(500).send(err.message);
    }
  });
};

