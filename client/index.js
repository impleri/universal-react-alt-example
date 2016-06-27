import "console-shim";
import Iso from "iso";
import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import "./sources/";
import flux from "../common/bootstrap";
import Config from "../common/utils/config";
import App from "./app";

const rootEl = document.getElementById("app");

// Debug client-side
if (Config.isTrue("APP_DEBUG") && window) {
  console.info("Debug enabled");
  window["alt.js.org"] = flux;
}

Iso.bootstrap(function (state) {
  flux.bootstrap(state);

  render(
    <AppContainer>
      <App />
    </AppContainer>,
    rootEl
  );
});

if (module.hot) {
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
