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

export default async function middleware(context, next) {
  await next();

  match({routes, location: context.url}, (error, redirect, renderProps) => {
    console.log("Matching page", context.url, error, redirect);
    if (error) {
      context.throw(500, error.message);
      return;
    }

    if (redirect) {
      context.redirect(redirect.pathname + redirect.search);
      return;
    }

    if (renderProps == null) {
      context.status = 404;
      return;
    }

    const iso = new Iso(),
        initView = renderToString(<RouterContext {...renderProps} />);

    iso.add(initView, flux.flush());
    context.type = "html";
    context.body = renderFullPage(iso.render());

    return;
  });
};
