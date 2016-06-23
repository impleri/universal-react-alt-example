import Iso from "iso";
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import shimConsole from "console-shim";
import Sources from "./sources/";
import flux from "../common/bootstrap";
import routes from "../common/routes";
import Config from "../common/utils/config";

// Debug client-side
if (Config.isTrue("APP_DEBUG") && window) {
  console.info("Debug enabled");
  window["alt.js.org"] = flux;
}

Iso.bootstrap(function (state, _, container) {
  flux.bootstrap(state);

  render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById("app")
  );
});
